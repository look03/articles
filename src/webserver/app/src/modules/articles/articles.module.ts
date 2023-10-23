import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Articles } from '@/articles/models/articles.model';

@Module({
  imports: [SequelizeModule.forFeature([Articles])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
