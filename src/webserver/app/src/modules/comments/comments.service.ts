import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from '#/comments.model';
import { ResponseCommentDTO, CreateCommentDTO } from '@/comments/dto';

import {
  CREATE_COMMENT_MESSAGE_ACCEPTED,
  CREATE_COMMENT_MESSAGE_ERROR,
  DELETE_COMMENT_MESSAGE_ACCEPTED,
  DELETE_COMMENT_MESSAGE_ERROR,
  GET_COMMENT_MESSAGE_ACCEPTED,
  GET_COMMENT_MESSAGE_NOT_FOUND,
  GET_COMMENTS_MESSAGE_ACCEPTED,
  GET_COMMENTS_MESSAGE_ERROR,
  GET_COMMENTS_MESSAGE_NOT_FOUND,
  UPDATE_COMMENT_MESSAGE_ACCEPTED,
} from '@/comments/consts';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);

  constructor(
    @InjectModel(Comments) private readonly commentsRepository: typeof Comments,
  ) {}

  /**
   * Создание или обновление комментария
   * @param articleId
   * @param dto
   */
  async createComment(
    articleId: number,
    dto: CreateCommentDTO,
  ): Promise<ResponseCommentDTO> {
    try {
      const values = {
        text: dto.text,
        article_id: articleId,
      };

      if (dto.id) {
        await this.commentsRepository.update(values, {
          where: {
            id: dto.id,
            article_id: articleId,
          },
        });

        return {
          status: HttpStatus.CREATED,
          message: UPDATE_COMMENT_MESSAGE_ACCEPTED,
          data: {
            id: dto.id,
          },
        };
      }

      const response = await this.commentsRepository.create(values);

      return {
        status: HttpStatus.CREATED,
        message: CREATE_COMMENT_MESSAGE_ACCEPTED,
        data: {
          commentId: response.id,
        },
      };
    } catch (e) {
      this.logger.error(`${CREATE_COMMENT_MESSAGE_ERROR} ${e}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: CREATE_COMMENT_MESSAGE_ERROR,
        data: null,
      };
    }
  }

  /**
   * Получение статей
   */
  async getComments(articleId: number): Promise<ResponseCommentDTO> {
    try {
      const response = await this.commentsRepository.findAll({
        where: {
          article_id: articleId,
        },
      });

      if (!response) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: GET_COMMENTS_MESSAGE_NOT_FOUND,
          data: null,
        };
      }

      return {
        status: HttpStatus.ACCEPTED,
        message: GET_COMMENTS_MESSAGE_ACCEPTED,
        data: {
          items: response,
        },
      };
    } catch (e) {
      this.logger.error(`${GET_COMMENTS_MESSAGE_ERROR} ${e}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: GET_COMMENTS_MESSAGE_ERROR,
        data: null,
      };
    }
  }

  /**
   * Получение статьи
   * @param id
   * @param articleId
   */
  async getComment(id: number, articleId: number): Promise<ResponseCommentDTO> {
    try {
      const response = await this.commentsRepository.findOne({
        where: {
          id,
          article_id: articleId,
        },
      });

      if (!response) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: GET_COMMENT_MESSAGE_NOT_FOUND,
          data: null,
        };
      }

      return {
        status: HttpStatus.ACCEPTED,
        message: GET_COMMENT_MESSAGE_ACCEPTED,
        data: response,
      };
    } catch (e) {
      this.logger.error(`${GET_COMMENT_MESSAGE_ACCEPTED} ${e}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: GET_COMMENT_MESSAGE_ACCEPTED,
        data: null,
      };
    }
  }

  /**
   * Удаление комментария у статьи
   * @param id
   * @param articleId
   */
  async deleteComment(
    id: number,
    articleId: number,
  ): Promise<ResponseCommentDTO> {
    try {
      await this.commentsRepository.destroy({
        where: {
          id,
          article_id: articleId,
        },
      });

      return {
        status: HttpStatus.ACCEPTED,
        message: `${DELETE_COMMENT_MESSAGE_ACCEPTED} (${id})`,
        data: null,
      };
    } catch (e) {
      this.logger.error(`${DELETE_COMMENT_MESSAGE_ERROR} ${e}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: DELETE_COMMENT_MESSAGE_ERROR,
        data: {},
      };
    }
  }
}
