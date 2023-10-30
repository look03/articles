import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comments } from '#/comments.model';
import { Articles } from '#/articles.model';

@Module({
  imports: [SequelizeModule.forFeature([Comments, Articles])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
