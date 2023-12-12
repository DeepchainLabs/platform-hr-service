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
        urls: ["amqp://localhost:5672"],
        queueOptions: { durable: true },
      },
    },
  );
  await app.listen();
}
bootstrap();
