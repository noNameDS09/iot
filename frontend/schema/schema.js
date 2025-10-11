import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'servers',
      columns: [
        { name: 'server_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'local_ip_address', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'nodes',
      columns: [
        { name: 'node_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'state', type: 'string' },
        { name: 'temperature', type: 'number', isOptional: true },
      ],
    }),
    // This table manages the many-to-many relationship
    tableSchema({
      name: 'links', 
      columns: [
        { name: 'server_id', type: 'string', isIndexed: true },
        { name: 'node_id', type: 'string', isIndexed: true },
      ],
    }),
    tableSchema({
      name: 'datapoints',
      columns: [
        { name: 'node_id', type: 'string', isIndexed: true },
        { name: 'timestamp', type: 'number', isIndexed: true },
        { name: 'current', type: 'number' },
        { name: 'voltage', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'alerts',
      columns: [
        { name: 'device_id', type: 'string', isOptional: true, isIndexed: true },
        { name: 'level', type: 'string' },
        { name: 'message', type: 'string' },
        { name: 'acknowledged', type: 'boolean' },
        { name: 'created_at', type: 'number' },
      ],
    }),
  ],
});