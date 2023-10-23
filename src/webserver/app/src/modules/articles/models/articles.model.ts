import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Comments } from '@/comments/models/comments.model';

@Table({ tableName: 'articles' })
export class Articles extends Model {
  @Column({
    type: DataType.STRING,
    comment: 'Заголовок статьи',
  })
  title: string;

  @Column({
    type: DataType.STRING,
    comment: 'Текст статьи',
  })
  text: string;

  @HasMany(() => Comments)
  comments: Comments[];
}
