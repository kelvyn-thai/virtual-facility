import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  port: process.env.BUILDINGS_PORT,
  host: process.env.BUILDINGS_HOST,
}));
