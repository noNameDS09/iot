import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class EnergyHistory extends Model {
  static table = 'energy_history';

  @field('date') date;
  @field('kwh') kWh;
}
