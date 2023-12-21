import { Module } from "@nestjs/common";
import { PostgresDatabaseProviderModule } from "./providers/database/postgres/provider.module";
import { ConfigModule } from "@nestjs/config";
import global_config from "./config/global_config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { LeaveModule } from "./modules/leave/leave.module";
import { CalendarModule } from "./modules/calendar/calendar.module";
import { DiscordModule } from "./modules/discord-module/discord.module";

@Module({
  imports: [
    LeaveModule,
    CalendarModule,
    EventEmitterModule.forRoot(),
    PostgresDatabaseProviderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [global_config],
    }),
    ...(process.env.HAS_ATTENDANCE_MODULE === "true" ? [DiscordModule] : []),
    ClientsModule.register({
      isGlobal: true,
      clients: [
        {
          name: "UserService",
          transport: Transport.RMQ,
          options: {
            queue: "UserServiceQueue",
            urls: [process.env.AMQP_URL ?? ""],
            queueOptions: { durable: true },
          },
        },
      ],
    }),
    ...(process.env.HAS_ATTENDANCE_MODULE === "true"
      ? [
          ClientsModule.register([
            {
              name: "AttendanceService",
              transport: Transport.RMQ,
              options: {
                queue: "AttendanceServiceQueue",
                urls: [process.env.AMQP_URL ?? ""],
                queueOptions: { durable: true },
              },
            },
          ]),
        ]
      : []),
  ],
})
export class AppModule {}
