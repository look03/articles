import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class GetCommentsFromPeriodDTO {
  @IsString({
    message: 'В поле title нужно вводить данные типа string',
  })
  @IsNotEmpty()
  dateFrom: string;

  @IsString({
    message: 'В поле title нужно вводить данные типа string',
  })
  @IsNotEmpty()
  dateTo: string;
}

export class ResponseAnalyticDTO {
  @IsString()
  message: string;

  @IsNumber()
  status: number;

  data?: any;
}
