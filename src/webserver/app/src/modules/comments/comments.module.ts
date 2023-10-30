import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comments } from '#/comments.model';

@Module({
  imports: [SequelizeModule.forFeature([Comments])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
