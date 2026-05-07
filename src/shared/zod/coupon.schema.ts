import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { COUPON_TYPES, REQUIREMENT_TYPES } from '../constants/constants';

// CreateCouponSchema 
export const CreateCouponSchema = z.object({
  code: z
    .string()
    .trim()
    .min(3, 'Coupon code is required')
    .transform((value) =>
      value.toUpperCase(),
    ),

  type: z.enum(COUPON_TYPES),

  value: z
    .number({
      error: 'Value must be a number',
    })
    .positive(
      'Value must be greater than 0',
    ),

  minOrderValue: z
    .number()
    .min(0)
    .optional()
    .default(0),

  applicableOn: z
    .array(
      z.enum(REQUIREMENT_TYPES),
    )
    .optional()
    .default([]),

  usageLimit: z
    .number()
    .int()
    .positive()
    .default(100),

  usedCount: z
    .number()
    .int()
    .min(0)
    .default(0),

  expiryDate: z.preprocess(
    (value) => new Date(value as string),

    z.date({
      error: 'Invalid expiry date',
    }),
  ),

  isActive: z
    .boolean()
    .default(true),
});

export const ValidateCouponSchema =
  z.object({
    couponCode: z
      .string()
      .trim()
      .min(1, 'Coupon code required')
      .transform((value) =>
        value.toUpperCase(),
      ),

    requirementType: z.enum(
      REQUIREMENT_TYPES,
    ),

    budgetRange: z.preprocess(
      (value) => Number(value),

      z
        .number()
        .positive(
          'Budget must be greater than 0',
        ),
    ),
  });


export type CreateCouponInput = z.infer<typeof CreateCouponSchema>;

export type ValidateCouponInput = z.infer<typeof ValidateCouponSchema>;

export class CreateCouponDto extends createZodDto(CreateCouponSchema) { }

export class ValidateCouponDto extends createZodDto(ValidateCouponSchema) { }