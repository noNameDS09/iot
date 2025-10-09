// utils/db.js
const knex = require('knex');
const path = require('path');

const dbPath = path.resolve(__dirname, '../Database/energy.db');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

// Create tables if they don't exist
async function createTables() {
  const hasEnergyHistory = await db.schema.hasTable('energy_history');
  if (!hasEnergyHistory) {
    await db.schema.createTable('energy_history', (table) => {
      table.increments('id').primary();
      table.string('date').notNullable();
      table.integer('kWh').notNullable();
    });
  }

  const hasTopConsumers = await db.schema.hasTable('top_consumers');
  if (!hasTopConsumers) {
    await db.schema.createTable('top_consumers', (table) => {
      table.increments('id').primary();
      table.string('device').notNullable();
      table.integer('kWh').notNullable();
    });
  }

  const hasHourlyUsage = await db.schema.hasTable('energy_usage_hourly');
  if (!hasHourlyUsage) {
    await db.schema.createTable('energy_usage_hourly', (table) => {
      table.increments('id').primary();
      table.integer('day').notNullable();   // 0=Sun, 1=Mon, ..., 6=Sat
      table.integer('hour').notNullable();  // 0-23
      table.integer('kWh').notNullable();
    });
  }

  console.log('Connected to SQLite with Knex. Tables ready.');
}

createTables().catch((err) => {
  console.error('Error creating tables:', err);
});

module.exports = db;
