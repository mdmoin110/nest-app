import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

export class UpdatePostDto {

  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsOptional()
  created_at: Date;

  @ApiProperty()
  @IsOptional()
  updated_at: Date;
}