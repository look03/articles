import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateArticleDTO } from '@/articles/dto';
import { ArticlesService } from '@/articles/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async createArticle(@Body() CreateArticleDTO: any) {
    return this.articlesService.createArticle();
  }
}
