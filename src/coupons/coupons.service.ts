import { BadRequestException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { CouponsRepository } from './coupons.repository';
import { LeadsRepository } from '../leads/leads.repository';
import { ValidateCouponDto } from '../shared/zod/coupon.schema';
import { MESSAGES } from '../shared/constants/constants';
import { MongoCoupon } from '../shared/mongoose/coupon.schema';

@Injectable()
export class CouponsService {

    constructor(
        private readonly couponsRepository:
            CouponsRepository,
        @Inject(forwardRef(() => LeadsRepository))
        private readonly leadsRepository: LeadsRepository,
    ) { }

    async validateCoupon(
        payload: ValidateCouponDto,
    ) {

        const coupon =
            await this.couponsRepository
                .findCouponByCode(
                    payload.couponCode,
                );

        // Exists
        if (!coupon) {
            throw new BadRequestException(
                MESSAGES.COUPON.INVALID,
            );
        }

        // Expired
        if (
            new Date() >
            new Date(coupon.expiryDate)
        ) {
            throw new BadRequestException(
                MESSAGES.COUPON.EXPIRED,
            );
        }

        // Usage limit
        if (
            coupon.usedCount >=
            coupon.usageLimit
        ) {
            throw new BadRequestException(
                MESSAGES.COUPON.LIMIT_REACHED,
            );
        }

        // Minimum order
        if (
            payload.budgetRange <
            coupon.minOrderValue
        ) {
            throw new BadRequestException(
                MESSAGES.COUPON.MIN_ORDER(coupon.minOrderValue),
            );
        }

        // Requirement Type
        if (
            coupon.applicableOn.length > 0 &&
            !coupon.applicableOn.includes(
                payload.requirementType,
            )
        ) {
            throw new BadRequestException(
                MESSAGES.COUPON.NOT_APPLICABLE,
            );
        }

        // First-time user only
        if (coupon.isFirstTimeOnly) {
            const existingLead = await this.leadsRepository.findLeadByEmail(payload.email);
            if (existingLead) {
                throw new BadRequestException(
                    'This coupon is only for new users',
                );
            }
        }

        return coupon;
    }

    calculateCouponDiscount(
        budgetRange: number,
        coupon: MongoCoupon,
    ) {

        let discountAmount = 0;

        // Percentage
        if (
            coupon.type === 'PERCENT'
        ) {
            discountAmount =
                (budgetRange *
                    coupon.value) /
                100;
        }

        // Flat
        if (
            coupon.type === 'FLAT'
        ) {
            discountAmount =
                coupon.value;
        }

        const finalPrice =
            budgetRange -
            discountAmount;

        return {
            discountAmount,

            finalPrice,
        };
    }

    async applyCoupon(
        couponCode: string,
    ) {

        const coupon =
            await this.couponsRepository
                .findCouponByCode(
                    couponCode,
                );

        if (!coupon) {
            return;
        }

        await this.couponsRepository
            .incrementUsedCount(
                coupon.code,
            );
    }
}