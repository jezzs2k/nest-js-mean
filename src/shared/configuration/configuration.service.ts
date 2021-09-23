import { Injectable } from '@nestjs/common';
import { get } from 'config';

import { Configuration } from './configguration.enum';

@Injectable()
export class ConfigurationService {
  static connectionString: string =
    process.env[Configuration.MONGO_URI] ||
    'mongodb://admin:admin@localhost:27017/nestjs';
  private environmentHosting: string = process.env.NODE_ENV || 'development';

  get(name: string): string {
    return process.env[name] || get(name);
  }

  get isDevelopment(): boolean {
    return this.environmentHosting === 'development';
  }
}
