import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Articles } from '#/articles.model';
import { GetCommentsFromPeriodDTO, ResponseAnalyticDTO } from '@/analytic/dto';
import {
  GET_COMMENTS_FROM_PERIOD_MESSAGE_ACCEPTED,
  GET_COMMENTS_FROM_PERIOD_MESSAGE_ERROR,
} from '@/analytic/consts';
import { Op } from 'sequelize';
import { Comments } from '#/comments.model';

@Injectable()
export class AnalyticService {
  private readonly logger = new Logger(AnalyticService.name);

  constructor(
    @InjectModel(Articles) private readonly articlesRepository: typeof Articles,
  ) {}

  async getCommentsFromPeriod(
    dto: GetCommentsFromPeriodDTO,
  ): Promise<ResponseAnalyticDTO> {
    try {
      const response = await this.articlesRepository.findAll({
        attributes: ['id', 'title'],
        include: {
          model: Comments,
          where: {
            createdAt: {
              [Op.between]: [new Date(dto.dateFrom), new Date(dto.dateTo)],
            },
          },
          attributes: ['id', 'text', 'createdAt'],
        },
      });

      return {
        status: HttpStatus.ACCEPTED,
        message: GET_COMMENTS_FROM_PERIOD_MESSAGE_ACCEPTED,
        data: {
          items: response,
        },
      };
    } catch (e) {
      this.logger.error(`${GET_COMMENTS_FROM_PERIOD_MESSAGE_ERROR} ${e}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: GET_COMMENTS_FROM_PERIOD_MESSAGE_ERROR,
        data: null,
      };
    }
  }
}
