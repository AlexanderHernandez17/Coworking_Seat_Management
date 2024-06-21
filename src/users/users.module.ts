import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, Room, Session, Booking, User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
