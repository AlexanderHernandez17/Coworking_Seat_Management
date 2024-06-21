import { IsDateString, IsInt } from 'class-validator';

export class CreateSessionDto {
  @IsDateString()
  readonly start_time: Date;

  @IsDateString()
  readonly end_time: Date;

  @IsInt()
  readonly room_id: number;
}
