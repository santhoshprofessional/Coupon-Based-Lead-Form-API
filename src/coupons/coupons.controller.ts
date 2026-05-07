import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { ValidateCouponDto } from '../shared/zod/coupon.schema';

@Controller('coupons')
export class CouponsController {

    constructor(
        private readonly couponsService: CouponsService,
    ) { }

    @Post('validate')
    async validateCoupon(
        @Body()
        body: ValidateCouponDto,
    ) {

        const coupon =
            await this.couponsService
                .validateCoupon(body);

        const discountData =
            this.couponsService
                .calculateCouponDiscount(
                    body.budgetRange,
                    coupon,
                );

        return {
            success: true,

            couponCode: coupon.code,

            ...discountData,
        };
    }
}