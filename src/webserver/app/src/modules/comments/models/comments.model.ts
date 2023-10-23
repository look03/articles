import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Articles } from '@/articles/models/articles.model';

@Table({ tableName: 'comments' })
export class Comments extends Model {
  @Column({
    type: DataType.STRING,
    comment: 'Текст комментария',
  })
  text: string;

  @ForeignKey(() => Articles)
  @Column({
    type: DataType.INTEGER,
    comment: 'Id статьи',
  })
  article_id: number;

  @BelongsTo(() => Articles)
  article: Articles;
}
