import * as Notifications from 'expo-notifications';
// Assuming you have your database instance and models exported
import { database } from '../database';
import Alert from '../database/models/Alert';

/**
 * Creates an alert in the local WatermelonDB and triggers a 
 * local push notification if the alert is critical.
 * @param {string | null} deviceId - The ID of the device causing the alert.
 * @param {'normal' | 'critical'} level - The severity of the alert.
 * @param {string} message - The alert message.
 */
export const createAlert = async (deviceId, level, message) => {
    try {
        // 1. Save the alert to the local WatermelonDB
        await database.write(async () => {
            const alertsCollection = database.collections.get('alerts');
            await alertsCollection.create(alert => {
                alert.deviceId = deviceId;
                alert.level = level;
                alert.message = message;
                alert.acknowledged = false;
                alert.createdAt = new Date();
            });
        });

        console.log(`Local alert created: ${message}`);

        // 2. If the alert is critical, schedule an immediate local push notification
        if (level === 'critical') {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Aura Critical Alert",
                    body: message,
                    sound: 'default', 
                },
                trigger: null, // send immediately
            });
            console.log("Critical push notification scheduled.");
        }
    } catch (error) {
        console.error("Failed to create local alert:", error);
    }
};

/**
 * Configures the notification handler for the app.
 * This should be called once when your app starts up.
 */
export const setupNotificationHandler = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
};

