import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { User } from 'src/users/entities/user.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Session } from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, User, Room, Booking, Session])],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
