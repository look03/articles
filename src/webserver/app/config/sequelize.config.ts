import { SequelizeModuleOptions } from '@nestjs/sequelize';

const env = process.env;

export default {
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  host: env.POSTGRES_HOST,
  port: +env.POSTGRES_PORT,
  dialect: 'postgres',
  autoLoadModels: true,
  synchronize: true,
  logging: false,
} as SequelizeModuleOptions;
