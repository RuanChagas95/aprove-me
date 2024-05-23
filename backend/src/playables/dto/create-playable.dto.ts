import { IsDateString, IsNumber, IsUUID } from 'class-validator';

export class CreatePlayableDto {
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  readonly value: number;
  @IsDateString()
  readonly emissionDate: Date;
  @IsUUID()
  readonly assignor: string;
}
