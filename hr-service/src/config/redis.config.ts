import * as dotenv from "dotenv";
dotenv.config();

export const redisConfig = {
  port: 6379,
  host: process.env.REDIS_HOST || "localhost",
  username: process.env.REDIS_USERNAME || undefined,
  password: process.env.REDIS_PASSWORD,
};
