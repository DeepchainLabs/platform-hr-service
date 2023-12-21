import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport, type MicroserviceOptions } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        queue: "HrServiceQueue",
        urls: [process.env.AMQP_URL ?? ""],
        queueOptions: { durable: true },
      },
    },
  );
  await app.listen();
}
bootstrap();
