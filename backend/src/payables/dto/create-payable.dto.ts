import { IsDateString, IsNumber } from 'class-validator';

export class CreatePayableDto {
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  readonly value: number;
  @IsDateString()
  readonly emissionDate: Date;
}
