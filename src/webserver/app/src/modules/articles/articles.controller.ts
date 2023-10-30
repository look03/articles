import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateArticleDTO, ResponseArticleDTO } from './dto';
import { ArticlesService } from '@/articles/articles.service';

@Controller('article')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async createArticles(
    @Body() dto: CreateArticleDTO,
  ): Promise<ResponseArticleDTO> {
    return await this.articlesService.createArticle(dto);
  }

  @Get('/:id')
  async getArticle(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseArticleDTO> {
    return await this.articlesService.getArticle(id);
  }

  @Get('/')
  async getArticles(): Promise<ResponseArticleDTO> {
    return await this.articlesService.getArticles();
  }

  @Patch('/:id')
  async updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateArticleDTO,
  ) {
    return await this.articlesService.createArticle({ id, ...dto });
  }

  @Delete('/:id')
  async deleteArticle(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseArticleDTO> {
    return await this.articlesService.deleteArticle(id);
  }
}
