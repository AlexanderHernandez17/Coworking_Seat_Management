import { IsInt, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  readonly user_id: number;

  @IsInt()
  readonly workspace_id: number;

  @IsInt()
  readonly session_id: number;

  @IsDateString()
  readonly booking_time: Date;
}
