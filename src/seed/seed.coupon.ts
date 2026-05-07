import { Model } from 'mongoose';
import { CreateCouponSchema } from '../shared/zod/coupon.schema';

export const couponSeedData = [
  {
    code: 'SAVE10',
    type: 'PERCENT',
    value: 10,
    minOrderValue: 500,
    applicableOn: [],
    usageLimit: 100,
    usedCount: 0,
    expiryDate: new Date('2026-12-31'),
    isActive: true,
  },
  {
    code: 'FLAT100',
    type: 'FLAT',
    value: 100,
    minOrderValue: 0,
    applicableOn: ['Service'],
    usageLimit: 100,
    usedCount: 0,
    expiryDate: new Date('2026-12-31'),
    isActive: true,
  },
  {
    code: 'NEWUSER',
    type: 'PERCENT',
    value: 20,
    minOrderValue: 0,
    applicableOn: [],
    usageLimit: 100,
    usedCount: 0,
    expiryDate: new Date('2026-12-31'),
    isActive: true,
  },
  {
    code: 'EXPIRE50',
    type: 'PERCENT',
    value: 50,
    minOrderValue: 0,
    applicableOn: [],
    usageLimit: 100,
    usedCount: 0,
    expiryDate: new Date('2025-12-31'),
    isActive: true,
  },
];
