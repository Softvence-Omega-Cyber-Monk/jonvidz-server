import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoomStatus } from '@prisma/client';

export class CreateRoomDto {
  @ApiProperty({ description: 'Unique room name', example: 'Room 101' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Room status', example: RoomStatus.AVAILABLE, enum: RoomStatus, required: false })
  @IsEnum(RoomStatus)
  @IsOptional()
  status?: RoomStatus;
}
