import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from '../config/sequelize.config';
import { ArticlesModule } from '@/articles/articles.module';
import { CommentsModule } from '@/comments/comments.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    ArticlesModule,
    CommentsModule,
  ],
})
export class AppModule {}
