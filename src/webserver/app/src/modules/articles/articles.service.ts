import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Articles } from '@/articles/models/articles.model';
import { CreateArticleDTO, ResponseArticleDTO } from '@/articles/dto';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);

  constructor(
    @InjectModel(Articles) private readonly articlesRepository: typeof Articles,
  ) {}

  /**
   * Создание статьи
   * @param dto
   */
  async createArticle(dto: CreateArticleDTO): Promise<ResponseArticleDTO> {
    try {
      const response = await this.articlesRepository.create({
        title: dto.title,
        text: dto.text,
      });

      return {
        status: HttpStatus.CREATED,
        data: {
          id: response.id,
        },
      };
    } catch (e) {
      this.logger.error(`Dont create article ${e}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          message: 'Not create article',
        },
      };
    }
  }

  /**
   * Получение статьи
   * @param id
   */
  async getArticle(id: number): Promise<ResponseArticleDTO> {
    try {
      const response = await this.articlesRepository.findByPk(id);

      if (!response) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            message: 'Не удалось найти статью',
          },
        };
      }

      return {
        status: HttpStatus.ACCEPTED,
        data: response,
      };
    } catch (e) {
      this.logger.error(`Dont create article ${e}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          message: 'Dont get article',
        },
      };
    }
  }
}
