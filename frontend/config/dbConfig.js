// database.js
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { appSchema } from '@nozbe/watermelondb';
import UserSchema from './schema/UserSchema';
import User from './models/User';

const adapter = new SQLiteAdapter({
  schema: appSchema({
    version: 1,
    tables: [UserSchema],
  }),
  dbName: 'watermelon.db',
});

const database = new Database({
  adapter,
  modelClasses: [User],
});

export default database;
