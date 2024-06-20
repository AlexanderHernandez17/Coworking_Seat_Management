import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { SessionsModule } from './sessions/sessions.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [UsersModule, RoomsModule, SessionsModule, WorkspacesModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
