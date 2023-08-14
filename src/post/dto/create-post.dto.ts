import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsBoolean, isNotEmpty, IsOptional } from "class-validator";

export class CreatePostDto {

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