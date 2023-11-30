import * as dotenv from "dotenv";
dotenv.config();

interface iConfigs<T> {
  clientId: string | undefined;
  guildId: string | undefined;
  token: string | undefined;
  intents: T;
  apiBearerToken: string | undefined;
  apiBaseUrl: string | undefined;
  botId?: string;
}

export const configs: iConfigs<number> = {
  clientId: process.env.BOT_CLIENT_ID,
  guildId: process.env.BOT_GUILD_ID,
  token: process.env.BOT_TOKEN,
  intents: parseInt(process.env.DISCORD_BOT_INTENT as any),
  apiBearerToken: process.env.API_BEARER_TOKEN,
  apiBaseUrl: process.env.API_BASE_URL,
  botId: process.env.BOT_ID,
};
