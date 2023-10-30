import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Articles } from '#/articles.model';
import { CreateArticleDTO, ResponseArticleDTO } from '@/articles/dto';
import {
  UPDATE_ARTICLE_MESSAGE_ACCEPTED,
  GET_ARTICLE_MESSAGE_ACCEPTED,
  GET_ARTICLE_MESSAGE_ERROR,
  GET_ARTICLE_MESSAGE_NOT_FOUND,
  CREATE_ARTICLE_MESSAGE_ACCEPTED,
  CREATE_ARTICLE_MESSAGE_ERROR,
  GET_ARTICLES_MESSAGE_ACCEPTED,
  GET_ARTICLES_MESSAGE_NOT_FOUND,
  GET_ARTICLES_MESSAGE_ERROR,
  DELETE_ARTICLE_MESSAGE_ERROR, DELETE_ARTICLE_MESSAGE_ACCEPTED,
} from '@/articles/consts';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);

  constructor(
    @InjectModel(Articles) private readonly articlesRepository: typeof Articles,
  ) {}

  /**
   * Создание статьи или обновление статьи
   * @param dto
   */
  async createArticle(dto: CreateArticleDTO): Promise<ResponseArticleDTO> {
    try {
      const values = {
        title: dto.title,
        text: dto.text,
      };

      if (dto.id) {
        await this.articlesRepository.update(values, {
          where: {
            id: dto.id,
          },
        });

        return {
          status: HttpStatus.CREATED,
          message: UPDATE_ARTICLE_MESSAGE_ACCEPTED,
          data: {
            id: dto.id,
          },
        };
      }

      const response = await this.articlesRepository.create(values);

      return {
        status: HttpStatus.CREATED,
        message: CREATE_ARTICLE_MESSAGE_ACCEPTED,
        data: {
          id: response.id,
        },
      };
    } catch (e) {
      this.logger.error(`${CREATE_ARTICLE_MESSAGE_ERROR} ${e}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: CREATE_ARTICLE_MESSAGE_ERROR,
        data: null,
      };
    }
  }

  /**
   * Удаление статьи
   * @param id
   */
  async deleteArticle(id: number): Promise<ResponseArticleDTO> {
    try {
      await this.articlesRepository.destroy({
        where: {
          id,
        },
      });

      return {
        status: HttpStatus.ACCEPTED,
        message: `${DELETE_ARTICLE_MESSAGE_ACCEPTED} (${id})`,
        data: null,
      };
    } catch (e) {
      this.logger.error(`${DELETE_ARTICLE_MESSAGE_ERROR} ${e}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: DELETE_ARTICLE_MESSAGE_ERROR,
        data: {},
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
          message: GET_ARTICLE_MESSAGE_NOT_FOUND,
          data: {},
        };
      }

      return {
        status: HttpStatus.ACCEPTED,
        message: GET_ARTICLE_MESSAGE_ACCEPTED,
        data: response,
      };
    } catch (e) {
      this.logger.error(`${GET_ARTICLE_MESSAGE_ERROR} ${e}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: GET_ARTICLE_MESSAGE_ERROR,
        data: {},
      };
    }
  }

  /**
   * Получение статей
   */
  async getArticles(): Promise<ResponseArticleDTO> {
    try {
      const response = await this.articlesRepository.findAll();

      if (!response) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: GET_ARTICLES_MESSAGE_NOT_FOUND,
          data: null,
        };
      }

      return {
        status: HttpStatus.ACCEPTED,
        message: GET_ARTICLES_MESSAGE_ACCEPTED,
        data: {
          items: response,
        },
      };
    } catch (e) {
      this.logger.error(`${GET_ARTICLES_MESSAGE_ERROR} ${e}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: GET_ARTICLES_MESSAGE_ERROR,
        data: null,
      };
    }
  }
}
