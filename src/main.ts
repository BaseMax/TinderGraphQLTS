import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, WebSocketAdapter } from "@nestjs/common";
import { ApolloServer } from "apollo-server-express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
