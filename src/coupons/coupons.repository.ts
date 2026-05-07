import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoCoupon } from '../shared/mongoose/coupon.schema';
import { DATABASE_COLLECTIONS } from '../shared/constants/constants';

@Injectable()
export class CouponsRepository {
  constructor(
    @InjectModel(DATABASE_COLLECTIONS.COUPONS)
    private readonly couponModel: Model<MongoCoupon>,
  ) {}

  async findCouponByCode(code: string) {
    return this.couponModel.findOne({ code }).lean();
  }

  async incrementUsedCount(code: string) {
    return this.couponModel.findOneAndUpdate(
      { code },
      { $inc: { usedCount: 1 } },
      { new: true },
    );
  }

  async createCoupon(payload: Partial<MongoCoupon>) {
    return this.couponModel.create(payload);
  }

  async getAllCoupons() {
    return this.couponModel.find().sort({ createdAt: -1 }).lean();
  }
}
