import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoLead } from '../shared/mongoose/lead.schema';
import { DATABASE_COLLECTIONS, LEAD_DUPLICATE_WINDOW_MS } from '../shared/constants/constants';

@Injectable()
export class LeadsRepository {

  constructor(
    @InjectModel(DATABASE_COLLECTIONS.LEADS)
    private readonly leadModel: Model<MongoLead>,
  ) { }

  async createLead(
    payload: Partial<MongoLead>,
  ) {
    return this.leadModel.create(payload);
  }

  async findRecentLead(
    email: string,
    phone: string,
  ) {
    return this.leadModel.findOne({
      $or: [
        { email },
        { phone },
      ],

      createdAt: {
        $gte: new Date(
          Date.now() - LEAD_DUPLICATE_WINDOW_MS,
        ),
      },
    }).select({ _id: 1, createdAt: 1 }).lean();
  }

  async getAllLeads() {
    return this.leadModel
      .find()
      .sort({ createdAt: -1 })
      .lean();
  }

  async findLeadByEmail(
    email: string,
  ) {
    return this.leadModel.findOne({
      email,
    }).lean();
  }
}