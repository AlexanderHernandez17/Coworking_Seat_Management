import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';


@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get('occupied')
  @ApiOperation({ summary: 'Get sessions ordered by occupied workspaces' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Number of items per page', example: 10 })
  @ApiQuery({ name: 'order', type: String, required: false, enum: ['ASC', 'DESC'], description: 'Order of items', example: 'ASC' })
  @ApiResponse({ status: 200, description: 'List of sessions ordered by occupied workspaces', type: [Session] })
  getSessionsOrderedByOccupied(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Session[]> {
    return this.sessionsService.getSessionsOrderedByOccupied(page, limit, order);
  }


  @Get('available')
  @ApiOperation({ summary: 'Get sessions ordered by available workspaces' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Number of items per page', example: 10 })
  @ApiQuery({ name: 'order', type: String, required: false, enum: ['ASC', 'DESC'], description: 'Order of items', example: 'ASC' })
  @ApiResponse({ status: 200, description: 'List of sessions ordered by available workspaces', type: [Session] })
  getSessionsOrderedByAvailable(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Session[]> {
    return this.sessionsService.getSessionsOrderedByAvailable(page, limit, order);
  }


  @Get(':sessionId/workspaces')
  @ApiOperation({ summary: 'Get workspaces by session ID' })
  @ApiParam({ name: 'sessionId', type: Number, description: 'Session ID' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Number of items per page', example: 10 })
  @ApiResponse({ status: 200, description: 'List of workspaces for a specific session', type: [Workspace] })
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
