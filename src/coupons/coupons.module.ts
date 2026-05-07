import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoCouponSchema } from '../shared/mongoose/coupon.schema';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { CouponsRepository } from './coupons.repository';
import { SeedService } from '../seed/seed.service';
import { LeadModule } from '../leads/leads.module';
import { DATABASE_COLLECTIONS } from '../shared/constants/constants';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DATABASE_COLLECTIONS.COUPONS,
        schema: MongoCouponSchema,
      },
    ]),
    forwardRef(() => LeadModule),
  ],
  controllers: [CouponsController],
  providers: [CouponsService, CouponsRepository, SeedService],
  exports: [CouponsService],
})
export class CouponsModule { }
