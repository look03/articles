import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateCommentDTO, ResponseCommentDTO } from '@/comments/dto';
import { CommentsService } from '@/comments/comments.service';

@Controller('/article/:article_id')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/comment')
  async createComment(
    @Param('article_id', ParseIntPipe) articleId: number,
    @Body() dto: CreateCommentDTO,
  ): Promise<ResponseCommentDTO> {
    return await this.commentsService.createComment(articleId, dto);
  }

  @Patch('/comment/:id')
  async updateComment(
    @Param('article_id', ParseIntPipe) articleId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCommentDTO,
  ): Promise<ResponseCommentDTO> {
    return await this.commentsService.createComment(articleId, { id, ...dto });
  }

  @Get('/comment/:id')
  async getComment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseCommentDTO> {
    return await this.commentsService.getComment(id);
  }

  @Get('/comments')
  async getComments(
    @Param('article_id', ParseIntPipe) articleId: number,
  ): Promise<ResponseCommentDTO> {
    return await this.commentsService.getComments(articleId);
  }

  @Delete('/comment/:id')
  async deleteComment(
    @Param('article_id', ParseIntPipe) articleId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseCommentDTO> {
    return await this.commentsService.deleteComment(id);
  }
}
