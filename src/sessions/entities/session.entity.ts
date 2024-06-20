import { Booking } from 'src/bookings/entities/booking.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity({name:'sessions'})
export class Session {
  @PrimaryGeneratedColumn()
  session_id: number;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @ManyToOne(() => Room, room => room.sessions)
  room: Room;

  @OneToMany(() => Booking, booking => booking.session)
  bookings: Booking[];
}
