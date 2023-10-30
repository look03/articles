import { Module } from '@nestjs/common';
import { AnalyticController } from './analytic.controller';
import { AnalyticService } from '@/analytic/analytic.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comments } from '#/comments.model';
import { Articles } from '#/articles.model';

@Module({
  imports: [SequelizeModule.forFeature([Comments, Articles])],
  controllers: [AnalyticController],
  providers: [AnalyticService],
})
export class AnalyticModule {}
