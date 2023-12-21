import { Module, forwardRef } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { DiscordService } from "./discord.service";

@Module({
  imports: [
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
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
