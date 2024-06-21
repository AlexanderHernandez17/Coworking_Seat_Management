import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from '../workspaces/entities/workspace.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Booking } from 'src/bookings/entities/booking.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {}

  async getWorkspacesByUser(userId: number, page: number = 1, limit: number = 10): Promise<{ workspaces: Workspace[], total: number }> {
    const [workspaces, total] = await this.workspaceRepository
      .createQueryBuilder('workspace')
      .leftJoin('workspace.bookings', 'booking')
      .leftJoin('booking.user', 'user')
      .where('user.id = :userId', { userId })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { workspaces, total };
  }
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
