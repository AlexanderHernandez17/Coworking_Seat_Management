
import { IsDate } from 'class-validator';
import { Session } from 'src/sessions/entities/session.entity';
import { User } from 'src/users/entities/user.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({name: 'bookings'})
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @ManyToOne(() => User, user => user.bookings,  { eager: true })
  user: User;

  @ManyToOne(() => Workspace, workspace => workspace.bookings,  { eager: true })
  workspace: Workspace;

  @ManyToOne(() => Session, session => session.bookings,  { eager: true })
  session: Session;

  @IsDate()
  @Column()
  booking_time: Date;
}
