import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCommentDTO {
  id?: number;

  @IsString({
    message: 'В поле title нужно вводить данные типа string',
  })
  @IsNotEmpty()
  text: string;
}

export class ResponseCommentDTO {
  @IsString()
  message: string;

  @IsNumber()
  status: number;

  data?: any;
}
