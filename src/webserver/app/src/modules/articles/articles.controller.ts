import {
  Controller,
  Post,
  Get,
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
  async getArticles(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.getArticle(id);
  }
}
