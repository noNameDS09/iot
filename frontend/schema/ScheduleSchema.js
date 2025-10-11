import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "schedules",
      columns: [
        // Foreign Key: Links this task to a specific device
        { name: "device_id", type: "string", isIndexed: true },

        // Task Details
        { name: "title", type: "string" },
        { name: "action", type: "string" }, // 'On' or 'Off'

        // Timing Details
        { name: "time", type: "string" }, // e.g., "08:00"
        { name: "days_json", type: "string", isOptional: true }, // Array of days ['M', 'Tu', ...] stored as JSON
        { name: "date", type: "string", isOptional: true }, // YYYY-MM-DD for one-time events

        // Status and Metadata
        { name: "enabled", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),

    // NOTE: 'devices' and 'users' are assumed to exist based on your file structure
    // These must be present for the foreign keys to work correctly.
    tableSchema({
      name: "devices",
      columns: [
        { name: "name", type: "string" },
        { name: "status", type: "string" },
      ],
    }),
    tableSchema({
      name: "users",
      columns: [
        { name: "user_id", type: "string" }, // This should be the primary key if available
        { name: "name", type: "string" },
      ],
    }),
  ],
});
