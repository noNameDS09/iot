// models/User.js
import { Model } from '@nozbe/watermelondb';
import { field, date, relation, lazy } from '@nozbe/watermelondb/decorators';

class User extends Model {
  static table = 'users';

  @field('name') name;
  @field('email') email;
  @date('created_at') createdAt;
  @lazy posts;

  @relation('posts', 'user_id') posts;
}

export default User;
