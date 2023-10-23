import { IsString } from 'class-validator';

export class CreateArticleDTO {
  @IsString()
  title: string;

  @IsString()
  text: string;
}
