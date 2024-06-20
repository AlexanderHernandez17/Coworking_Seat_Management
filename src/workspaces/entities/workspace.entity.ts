import { Booking } from 'src/bookings/entities/booking.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  workspace_id: number;

  @ManyToOne(() => Room, room => room.workspaces)
  room: Room;

  @Column()
  row: number;

  @Column()
  column: number;

  @OneToMany(() => Booking, booking => booking.workspace)
  bookings: Booking[];
}
