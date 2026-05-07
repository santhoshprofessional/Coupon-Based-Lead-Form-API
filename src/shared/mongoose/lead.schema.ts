import { Schema, Document } from 'mongoose';
import { REQUIREMENT_TYPES } from '../constants/constants';

export const MongoLeadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    requirementType: {
      type: String,
      enum: REQUIREMENT_TYPES,
      required: true,
    },

    budgetRange: {
      type: Number,
      required: true,
    },

    message: {
      type: String,
      default: null,
    },

    couponCode: {
      type: String,
      default: null,
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    finalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
).index({ createdAt: -1 });

export interface MongoLead extends Document {
  name: string;
  phone: string;
  email: string;
  city: string;
  requirementType:
  (typeof REQUIREMENT_TYPES)[number];
  budgetRange: number;
  message?: string | null;
  couponCode?: string | null;
  discountAmount: number;
  finalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}