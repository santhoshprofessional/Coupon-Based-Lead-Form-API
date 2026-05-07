import {
  Schema,
  Document,
} from 'mongoose';
import { COUPON_TYPES } from '../constants/constants';

export const MongoCouponSchema =
  new Schema(
    {
      code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
      },

      type: {
        type: String,
        enum: COUPON_TYPES,
        required: true,
      },

      value: {
        type: Number,
        required: true,
      },

      minOrderValue: {
        type: Number,
        default: 0,
      },

      applicableOn: {
        type: [String],
        default: [],
      },

      expiryDate: {
        type: Date,
        required: true,
      },

      usageLimit: {
        type: Number,
        default: 100,
      },

      usedCount: {
        type: Number,
        default: 0,
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },

    {
      timestamps: true,
    },
  );

export interface MongoCoupon extends Document {
  code: string;
  type:
    (typeof COUPON_TYPES)[number];
  value: number;
  minOrderValue: number;
  applicableOn: string[];
  expiryDate: Date;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}