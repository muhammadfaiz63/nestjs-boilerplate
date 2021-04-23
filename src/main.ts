import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  let PORT = 3001;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.connectMicroservice(
    {
      transport: Transport.TCP,
    },
    { inheritAppConfig: true },
  );
  await app.startAllMicroservicesAsync();
  await app.listen(PORT, () => console.log(`on PORT ${PORT}`));
}
bootstrap();
