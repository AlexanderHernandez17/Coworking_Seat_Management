import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get('occupied')
  getSessionsOrderedByOccupied(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Session[]> {
    return this.sessionsService.getSessionsOrderedByOccupied(page, limit, order);
  }

  @Get('available')
  getSessionsOrderedByAvailable(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Session[]> {
    return this.sessionsService.getSessionsOrderedByAvailable(page, limit, order);
  }


  @Get(':sessionId/workspaces')
  async getWorkspacesBySession(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<{ workspaces: Workspace[], total: number }> {
    return this.sessionsService.getWorkspacesBySession(sessionId, page, limit);
  }

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(+id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}
