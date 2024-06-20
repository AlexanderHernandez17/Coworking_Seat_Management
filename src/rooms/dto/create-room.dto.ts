import { IsString, IsInt, Min } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  readonly name: string;

  @IsInt()
  @Min(1)
  readonly num_columns: number;

  @IsInt()
  @Min(1)
  readonly num_rows: number;
}
