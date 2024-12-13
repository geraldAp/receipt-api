import { IsArray, IsString, ArrayMinSize, IsObject } from 'class-validator';

export class ReceiptDTO {
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  heading: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsObject({ each: true })
  data: { name: string; value: string | number }[];

  @IsArray()
  @ArrayMinSize(1)
  @IsObject({ each: true })
  footer: { name: string; value: string | number }[];
}
