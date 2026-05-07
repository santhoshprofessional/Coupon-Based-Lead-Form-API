import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { LeadsRepository } from '../leads/leads.repository';
import { LeadType } from '../shared/zod/lead.schema';
import { CouponsService } from '../coupons/coupons.service';

@Injectable()
export class LeadsService {

  constructor(
    private readonly leadsRepository: LeadsRepository,
    private readonly couponsService: CouponsService,
  ) { }

  async createLead(
    leadModel: LeadType,
  ) {

    // Duplicate prevention
    const existingLead =
      await this.leadsRepository.findRecentLead(
        leadModel.email,
        leadModel.phone,
      );

    if (existingLead) {
      throw new BadRequestException(
        'Duplicate submission detected',
      );
    }

    let discountAmount = 0;
    let finalPrice = leadModel.budgetRange;

    if (leadModel.couponCode) {
      // Dynamically validate the coupon
      const coupon = await this.couponsService.validateCoupon({
        couponCode: leadModel.couponCode,
        requirementType: leadModel.requirementType,
        budgetRange: leadModel.budgetRange,
        email: leadModel.email,
      });

      const discountData = this.couponsService.calculateCouponDiscount(
        leadModel.budgetRange,
        coupon,
      );

      discountAmount = discountData.discountAmount;
      finalPrice = discountData.finalPrice;
    }

    // Save lead
    const lead =
      await this.leadsRepository.createLead({
        ...leadModel,
        discountAmount,
        finalPrice,
      });

    // If a coupon was successfully applied, increment its usage limit
    if (leadModel.couponCode) {
      await this.couponsService.applyCoupon(leadModel.couponCode.toUpperCase());
    }

    return {
      success: true,
      message: 'Lead submitted successfully',
      data: lead,
    };
  }

  async getAllLeads() {
    const leads = await this.leadsRepository.getAllLeads();
    return {
      success: true,
      data: leads,
    };
  }
}