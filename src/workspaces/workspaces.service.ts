import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { AvailableWorkspaceDto } from './dto/available-workspace.dto';
import { Booking } from 'src/bookings/entities/booking.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async findAvailableWorkspaces(roomId: number, sessionId: number): Promise<AvailableWorkspaceDto[]> {
    const workspaces = await this.workspaceRepository.createQueryBuilder('workspace')
      .leftJoinAndSelect('workspace.bookings', 'booking', 'booking.sessionId = :sessionId', { sessionId })
      .leftJoinAndSelect('workspace.room', 'room')
      .where('workspace.roomId = :roomId', { roomId })
      .andWhere('booking.booking_id IS NULL')
      .getMany();

    return workspaces.map(workspace => new AvailableWorkspaceDto(workspace));
  }

  async findOccupiedWorkspaces(roomId: number, sessionId: number): Promise<AvailableWorkspaceDto[]> {
    const workspaces = await this.workspaceRepository.createQueryBuilder('workspace')
      .leftJoinAndSelect('workspace.bookings', 'booking', 'booking.sessionId = :sessionId', { sessionId })
      .leftJoinAndSelect('workspace.room', 'room')
      .where('workspace.roomId = :roomId', { roomId })
      .andWhere('booking.booking_id IS NOT NULL')
      .getMany();

    return workspaces.map(workspace => new AvailableWorkspaceDto(workspace));
  }

  async findWorkspacesByUser(userId: number): Promise<AvailableWorkspaceDto[]> {
    const bookings = await this.bookingRepository.createQueryBuilder('booking')
      .leftJoinAndSelect('booking.workspace', 'workspace')
      .leftJoinAndSelect('workspace.room', 'room')
      .where('booking.user.user_id = :userId', { userId })
      .getMany();

    const workspaces = bookings.map(booking => booking.workspace);
    return workspaces.map(workspace => new AvailableWorkspaceDto(workspace));
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
