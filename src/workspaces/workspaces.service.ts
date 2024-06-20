import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {}

  async getAvailableWorkspaces(sessionId: number, page: number, limit: number, order: 'ASC' | 'DESC'): Promise<Workspace[]> {
    const query = this.workspaceRepository.createQueryBuilder('workspace')
      .leftJoin('workspace.bookings', 'booking')
      .leftJoin('workspace.session', 'session')
      .leftJoin('booking.user', 'user')
      .where('session.id = :sessionId', { sessionId })
      .andWhere('user.id IS NULL')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('workspace.id', order);

    return query.getMany();
  }

  async getOccupiedWorkspaces(sessionId: number, page: number, limit: number, order: 'ASC' | 'DESC'): Promise<Workspace[]> {
    const query = this.workspaceRepository.createQueryBuilder('workspace')
      .leftJoin('workspace.bookings', 'booking')
      .leftJoin('workspace.session', 'session')
      .leftJoin('booking.user', 'user')
      .where('session.id = :sessionId', { sessionId })
      .andWhere('user.id IS NOT NULL')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('workspace.id', order);

    return query.getMany();
  }

  async create(createWorkspaceDto: CreateWorkspaceDto) {
    return 'This action adds a new workspace';
  }

  async findAll() {
    return `This action returns all workspaces`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} workspace`;
  }

  async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    return `This action updates a #${id} workspace`;
  }

  async remove(id: number) {
    return `This action removes a #${id} workspace`;
  }
}
