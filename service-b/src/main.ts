import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger();
const portNumber = 8889;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: portNumber,
    },
  });
  app.listen(() =>
    logger.log(`Microservice B is listening on port: ${portNumber}`),
  );
}
bootstrap();
