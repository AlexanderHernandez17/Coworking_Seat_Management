import { Workspace } from "../entities/workspace.entity";

export class AvailableWorkspaceDto {
  workspace_id: number;
  room_id: number;
  row: number;
  column: number;

  constructor(workspace: Workspace) {
    this.workspace_id = workspace.workspace_id;
    this.room_id = workspace.room.room_id;
    this.row = workspace.row;
    this.column = workspace.column;
  }
}
