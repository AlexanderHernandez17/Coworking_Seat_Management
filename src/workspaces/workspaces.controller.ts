import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { Workspace } from './entities/workspace.entity';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}


  @Get('available/:sessionId')
  getAvailableWorkspaces(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Workspace[]> {
    return this.workspacesService.getAvailableWorkspaces(sessionId, page, limit, order);
  }

  @Get('occupied/:sessionId')
  getOccupiedWorkspaces(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Workspace[]> {
    return this.workspacesService.getOccupiedWorkspaces(sessionId, page, limit, order);
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
