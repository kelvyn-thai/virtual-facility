import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBuildingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;
}
