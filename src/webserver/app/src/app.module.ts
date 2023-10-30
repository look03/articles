import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from '../config/sequelize.config';
import { ArticlesModule } from '@/articles/articles.module';
import { CommentsModule } from '@/comments/comments.module';
import { AnalyticModule } from '@/analytic/analytic.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    ArticlesModule,
    CommentsModule,
    AnalyticModule,
  ],
})
export class AppModule {}
