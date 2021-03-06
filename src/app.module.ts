import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './shared/configuration/configguration.enum';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forRoot(ConfigurationService.connectionString),
    UserModule,
    TodoModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static host: string;
  static port: number | string;
  static isDev: boolean;

  constructor(private readonly _configurationService: ConfigurationService) {
    AppModule.port = AppModule.normalizePort(
      // _configurationService.get(Configuration.PORT),
      8080,
    );
    AppModule.host = 'http://localhost';
    AppModule.isDev = _configurationService.isDevelopment;
  }

  private static normalizePort(param: number | string): number | string {
    const portNumber: number =
      typeof param === 'string' ? parseInt(param, 10) : param;

    if (isNaN(portNumber)) {
      return param;
    } else if (portNumber >= 0) return portNumber;
  }
}
