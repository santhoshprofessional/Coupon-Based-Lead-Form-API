import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoCoupon } from '../shared/mongoose/coupon.schema';
import { DATABASE_COLLECTIONS } from '../shared/constants/constants';
import { couponSeedData } from './seed.coupon';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(DATABASE_COLLECTIONS.COUPONS)
    private readonly couponModel: Model<MongoCoupon>,
  ) {}

  async onModuleInit() {
    await this.seedCoupons();
  }

  private async seedCoupons() {
    try {
      const count = await this.couponModel.countDocuments();
      if (count > 0) {
        this.logger.log('Coupons already exist, skipping seed.');
        return;
      }

      this.logger.log('Seeding initial coupon data...');
      await this.couponModel.insertMany(couponSeedData);
      this.logger.log('Seeding complete.');
    } catch (error) {
      this.logger.error('Error seeding coupons:', error.message);
    }
  }
}
