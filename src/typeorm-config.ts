import * as Path from 'path';
import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [Path.join(__dirname, 'src/**/*.entity{.ts,.js}')],
  subscribers: [Path.join(__dirname, 'src/**/*.subscriber{.ts,.js}')],
  migrations: [Path.join(__dirname, 'src/**/migrations/**/*{.ts,.js}')],
};
export default typeormConfig;
