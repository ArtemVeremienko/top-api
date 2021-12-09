import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  return {
    uri: configService.get<string>('MONGO_DB_URI'),
    ...getMongoOptions(),
  };
};

const getMongoOptions = (): MongooseModuleOptions => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority',
  loggerLevel: 'debug',
});
