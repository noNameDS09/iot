// schema/UserSchema.js
import { tableSchema } from '@nozbe/watermelondb';

const UserSchema = tableSchema({
  name: 'users',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'created_at', type: 'number' },
  ],
});

export default UserSchema;
