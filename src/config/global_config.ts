export default () => ({
  extra: {
    working_period: parseInt(process.env.WORKING_PERIOD as any) || 8,
    timezone: "Asia/Dhaka",
    is_live: process.env.IS_LIVE || "no",
  },
  env: {
    JWT_BEARER_SECRET: process.env.JWT_BEARER_SECRET || null,
    DISCORD_URL: process.env.DISCORD_URL || "https://discord.deepchainlabs.com",
    TENANT_IDENTIFIER: process.env.TENANT_IDENTIFIER || null,
    DB_TENANT_SCHEMA:
      process.env.DB_TENANT_SCHEMA2 || "322611e6-ba2f-4428-b8ce-4209c84ce6b9",
    EMAIL_URL: process.env.EMAIL_URL || "https://dev.geo.deepchainlabs.com",
    EMAILS: process.env.EMAILS,
    HR_CHANNEL: process.env.HR_CHANNEL,
  },
  environment: {
    is_production: process.env.IS_PRODUCTION == "yes" ? true : false,
    is_log_active: process.env.IS_LOG_ACTIVE == "yes" ? true : false,
  },
});
