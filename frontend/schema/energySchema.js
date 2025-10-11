import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const EnergySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'energy_history',
      columns: [
        { name: 'date', type: 'string' },
        { name: 'kwh', type: 'number' },
      ],
    }),
  ],
});