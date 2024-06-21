import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/sessions/entities/session.entity';
import { User } from 'src/users/entities/user.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Room } from './entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, User, Session, Booking, Room])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
