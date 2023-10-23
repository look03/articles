import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateArticleDTO {
  @IsString({
    message: 'В поле title нужно вводить данные типа string',
  })
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}

export class ResponseArticleDTO {
  @IsNumber()
  status: number;

  data?: any;
}
