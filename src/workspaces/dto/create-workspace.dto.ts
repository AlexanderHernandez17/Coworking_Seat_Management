import { IsInt, Min } from 'class-validator';

export class CreateWorkspaceDto {
  @IsInt()
  readonly room_id: number;

  @IsInt()
  @Min(1)
  readonly row: number;

  @IsInt()
  @Min(1)
  readonly column: number;
}
