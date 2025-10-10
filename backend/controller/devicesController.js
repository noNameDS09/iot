import { Q } from '@nozbe/watermelondb';
// Assuming you have your database instance and models exported
import { database } from '../database'; 
// Import the alert creation function
import { createAlert } from './AlertsService';

// Define thresholds for alerts locally in the app
const TEMP_CRITICAL_THRESHOLD = 95.0;
const TEMP_WARNING_THRESHOLD = 80.0;

/**
 * This is the main function for the app's operational logic.
 * It runs periodically in the background to sync device statuses.
 */
export const syncDeviceStatuses = async () => {
    console.log("Starting device status sync...");

    // 1. Get all servers from the local database
    const serversCollection = database.collections.get('servers');
    const allServers = await serversCollection.query().fetch();

    for (const server of allServers) {
        try {
            // 2. Ping the hardware server on the local network to get live node statuses
            const response = await fetch(`http://${server.localIpAddress}/api/v1/nodes`);
            if (!response.ok) {
                await createAlert(null, 'critical', `Server '${server.name}' is offline.`);
                continue; 
            }
            
            const liveNodes = await response.json();

            // 3. Get the current state of this server's nodes from our local DB
            const nodesCollection = database.collections.get('nodes');
            const localNodes = await nodesCollection.query(Q.where('serverId', server.id)).fetch();
            
            await database.write(async () => {
                for (const liveNode of liveNodes) {
                    const localNode = localNodes.find(n => n.nodeId === liveNode.nodeId);
                    
                    if (!localNode) continue; 

                    // 4. Check for changes and trigger alerts if necessary
                    
                    // CRITICAL: Check if status changed to offline
                    if (liveNode.status === 'offline' && localNode.status !== 'offline') {
                        await createAlert(localNode.id, 'critical', `Device '${localNode.name}' has gone offline.`);
                    }

                    // CRITICAL: Check for critical overheating
                    if (liveNode.temperature >= TEMP_CRITICAL_THRESHOLD && localNode.temperature < TEMP_CRITICAL_THRESHOLD) {
                        await createAlert(localNode.id, 'critical', `Overheating in '${localNode.name}'. Temp: ${liveNode.temperature}°C.`);
                    } 
                    // NORMAL: Check for warning-level temperature
                    else if (liveNode.temperature >= TEMP_WARNING_THRESHOLD && localNode.temperature < TEMP_WARNING_THRESHOLD) {
                        await createAlert(localNode.id, 'normal', `High temp warning for '${localNode.name}'. Temp: ${liveNode.temperature}°C.`);
                    }
                    
                    // 5. Update the local database with the new, live status
                    await localNode.update(node => {
                        node.status = liveNode.status;
                        node.state = liveNode.state;
                        node.temperature = liveNode.temperature;
                    });
                }
            });

        } catch (error) {
            console.error(`Failed to sync with server ${server.name}:`, error);
            await createAlert(null, 'critical', `Server '${server.name}' is unreachable.`);
        }
    }
    console.log("Device status sync complete.");
};

