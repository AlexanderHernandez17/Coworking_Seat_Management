import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { Workspace } from './entities/workspace.entity';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { AvailableWorkspaceDto } from './dto/available-workspace.dto';

@ApiTags('workspaces')
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}


  @Get('available/:roomId/:sessionId')
  @ApiOperation({ summary: 'Get available workspaces in a room for a specific session' })
  @ApiParam({ name: 'roomId', type: Number, description: 'ID of the room' })
  @ApiParam({ name: 'sessionId', type: Number, description: 'ID of the session' })
  @ApiResponse({
    status: 200,
    description: 'List of available workspaces',
    type: [AvailableWorkspaceDto]
  })
  async getAvailableWorkspaces(
    @Param('roomId') roomId: number,
    @Param('sessionId') sessionId: number
  ): Promise<AvailableWorkspaceDto[]> {
    return this.workspacesService.findAvailableWorkspaces(roomId, sessionId);
  }
  
  @Get('occupied/:roomId/:sessionId')
  @ApiOperation({ summary: 'Get occupied workspaces in a room for a specific session' })
  @ApiParam({ name: 'roomId', type: Number, description: 'ID of the room' })
  @ApiParam({ name: 'sessionId', type: Number, description: 'ID of the session' })
  @ApiResponse({
    status: 200,
    description: 'List of occupied workspaces',
    type: [AvailableWorkspaceDto]
  })
  async getOccupiedWorkspaces(
    @Param('roomId') roomId: number,
    @Param('sessionId') sessionId: number
  ): Promise<AvailableWorkspaceDto[]> {
    return this.workspacesService.findOccupiedWorkspaces(roomId, sessionId);
  }

  @Get('assigned/:userId')
  @ApiOperation({ summary: 'Get workspaces assigned to a user' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'List of workspaces assigned to the user',
    type: [AvailableWorkspaceDto]
  })
  async getWorkspacesByUser(
    @Param('userId') userId: number
  ): Promise<AvailableWorkspaceDto[]> {
    return this.workspacesService.findWorkspacesByUser(userId);
  }

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspacesService.create(createWorkspaceDto);
  }

  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspacesService.update(+id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(+id);
  }
}
