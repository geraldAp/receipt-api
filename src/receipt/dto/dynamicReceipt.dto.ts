import {
  IsArray,
  IsString,
  ArrayMinSize,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class DynamicObject {
  [key: string]: string | number;
}

export class DynamicReceiptDTO {
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  heading: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DynamicObject) // Allows any key-value structure
  data: DynamicObject[];

  @IsObject()
  @IsOptional()
  footer?: DynamicObject; // Allows footer to be optional
}
