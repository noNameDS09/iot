import { Model } from '@nozbe/watermelondb';
import { field, json, relation } from '@nozbe/watermelondb/decorators';

// --- JSON Field Mapping ---
const daysJson = {
  // Converts JavaScript array into a string for storage
  serialize: (array) => JSON.stringify(array || []),
  // Converts the stored string back into a JavaScript array
  deserialize: (jsonString) => JSON.parse(jsonString || '[]'),
};

export default class Schedule extends Model {
  static table = 'schedules';
  
  // Define associations (Foreign Keys)
  static associations = {
    devices: { type: 'belongs_to', key: 'device_id' },
    // If you had a user foreign key: users: { type: 'belongs_to', key: 'user_id' },
  };

  // Fields mapping directly to columns
  @field('device_id') deviceId;
  @field('title') title;
  @field('action') action;
  @field('time') time;
  @field('enabled') enabled;
  
  // JSON field for array storage (for recurring days)
  @json('days_json', daysJson) days;

  // Optional field for one-time events
  @field('date') date;

  // Relationship definition (Example: to access the linked Device object)
  // Assumes a Device model exists in your models folder
  // @relation('devices', 'device_id') device; 
}