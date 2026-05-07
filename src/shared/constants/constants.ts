export const COUPON_TYPES = ['PERCENT', 'FLAT'] as const;
export type CouponType = (typeof COUPON_TYPES)[number];

export const REQUIREMENT_TYPES = ['Service', 'Product', 'Consultation'] as const;
export type RequirementType = (typeof REQUIREMENT_TYPES)[number];

export const DATABASE_COLLECTIONS = {
  COUPONS: 'coupons',
  LEADS: 'leads',
} as const;

export const THROTTLE_CONFIG = {
  TTL: 60000, // 1 minute
  LIMIT: 20, // 20 requests
} as const;

export const LEAD_DUPLICATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

export const DEFAULT_PORT = 3000;
export const DEFAULT_CORS_ORIGIN = 'http://localhost:5173';

export const MESSAGES = {
  COUPON: {
    INVALID: 'Invalid coupon code',
    EXPIRED: 'Coupon expired',
    LIMIT_REACHED: 'Coupon usage limit reached',
    MIN_ORDER: (min: number) => `Minimum order ₹${min}`,
    NOT_APPLICABLE: 'Coupon not applicable for this requirement',
  },
  LEAD: {
    DUPLICATE: 'Duplicate submission detected',
    SUCCESS: 'Lead submitted successfully',
  },
} as const;
