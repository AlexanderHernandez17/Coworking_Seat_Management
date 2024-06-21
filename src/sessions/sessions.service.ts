import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { Booking } from 'src/bookings/entities/booking.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>
  ) {}

  async getSessionsOrderedByOccupied(page: number, limit: number, order: 'ASC' | 'DESC'): Promise<Session[]> {
    return this.sessionRepository.createQueryBuilder('session')
      .leftJoinAndSelect('session.workspaces', 'workspace')
      .orderBy('COUNT(workspace.id)', order)
      .groupBy('session_id')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async getSessionsOrderedByAvailable(page: number, limit: number, order: 'ASC' | 'DESC'): Promise<Session[]> {
    return this.sessionRepository.createQueryBuilder('session')
      .leftJoinAndSelect('session.workspaces', 'workspace')
      .orderBy('COUNT(workspace.id)', order)
      .groupBy('session.id')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }




  async getWorkspacesBySession(sessionId: number, page: number = 1, limit: number = 10): Promise<{ workspaces: Workspace[], total: number }> {
    // Buscar la sesión por su ID
    const session = await this.sessionRepository.findOne( { where: {
      session_id: sessionId},
      relations: ['bookings']
    });


    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`);
    }

    const bookings = session.bookings;

    const total = bookings.length;

    // Ordenar las bookings por algún criterio (en este caso por booking_id)
    bookings.sort((a, b) => a.booking_id - b.booking_id);

    const startIndex = (page - 1) * limit;
    const paginatedBookings = bookings.slice(startIndex, startIndex + limit);

    const workspaces = paginatedBookings.map(booking => booking.workspace);

    return { workspaces, total };
  }

  create(createSessionDto: CreateSessionDto) {
    return 'This action adds a new session';
  }

  findAll() {
    return `This action returns all sessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
