import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { EnvSchema } from "./types/env-zod.types";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<EnvSchema, true>>(ConfigService);
  const port = configService.get<number>("PORT");

  const logger = new Logger("Bootstrap");
  await app.listen(port, () => {
    logger.log(`🚀 Aplicação rodando na porta ${port}`);
    logger.log("🎯 Modo: desenvolvimento");
  });
}
bootstrap();
