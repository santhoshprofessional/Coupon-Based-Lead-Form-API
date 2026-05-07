import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoLeadSchema } from '../shared/mongoose/lead.schema';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { LeadsRepository } from './leads.repository';
import { CouponsModule } from '../coupons/coupons.module';
import { DATABASE_COLLECTIONS } from '../shared/constants/constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DATABASE_COLLECTIONS.LEADS,
        schema: MongoLeadSchema,
      },
    ]),
    CouponsModule,
  ],

  controllers: [LeadsController],

  providers: [
    LeadsService,
    LeadsRepository,
  ],

  exports: [
    LeadsService,
    LeadsRepository,
  ],
})
export class LeadModule { }