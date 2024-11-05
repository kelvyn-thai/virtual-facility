import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import * as path from 'path';

const {
  ORM_CONNECTION,
  ORM_HOST,
  ORM_PORT,
  ORM_USERNAME,
  ORM_PASSWORD,
  PARTNER_ORM_DB: ORM_DB,
  ORM_LOGGING,
  ORM_SYNCHRONIZE,
} = process.env;

export const ormConfig: Partial<DataSourceOptions> = {
  type: (ORM_CONNECTION as 'mysql') || 'mysql',
  host: ORM_HOST,
  port: Number(ORM_PORT),
  username: ORM_USERNAME,
  password: ORM_PASSWORD,
  database: ORM_DB,
  logging: Boolean(ORM_LOGGING),
  synchronize: Boolean(ORM_SYNCHRONIZE),
  entities: [
    `${path.resolve(__dirname, './apps/partner-service/src/**/*.entity.ts')}`,
  ],
  migrations: [
    `${path.resolve(__dirname, './apps/partner-service/src/migrations/*.ts')}`,
  ],
};

export default new DataSource(ormConfig as DataSourceOptions);
