import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticService } from '@/analytic/analytic.service';
import { GetCommentsFromPeriodDTO, ResponseAnalyticDTO } from '@/analytic/dto';

@Controller('analytic')
export class AnalyticController {
  constructor(private readonly analyticService: AnalyticService) {}

  @Get('/comments')
  async getCommentsFromPeriod(
    @Query() dto: GetCommentsFromPeriodDTO,
  ): Promise<ResponseAnalyticDTO> {
    return await this.analyticService.getCommentsFromPeriod(dto);
  }
}
