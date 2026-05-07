import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LeadModule } from './leads/leads.module';
import { CouponsModule } from './coupons/coupons.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { THROTTLE_CONFIG } from './shared/constants/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (
        configService: ConfigService,
      ) => {
        const uri = configService.get<string>('MONGODB_URL');
        console.log('URI:', uri);
        if (!uri) {
          throw new Error('MONGODB_URL is not defined in .env file');
        }
        return {
          uri,
        };
      },
    }),


    ThrottlerModule.forRoot([
      {
        ttl: THROTTLE_CONFIG.TTL,
        limit: THROTTLE_CONFIG.LIMIT,
      },
    ]),

    LeadModule,
    CouponsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }