import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { LeadsService } from '../leads/leads.service';
import { LeadDto } from 'src/shared/zod/lead.schema';


@Controller('leads')
export class LeadsController {

  constructor(
    private readonly leadsService: LeadsService,
  ) {}

  @Post()
  async createLead(@Body() LeadModel: LeadDto) {
    return this.leadsService.createLead(LeadModel);
  }

  @Get()
  async getAllLeads() {
    return this.leadsService.getAllLeads();
  }
}