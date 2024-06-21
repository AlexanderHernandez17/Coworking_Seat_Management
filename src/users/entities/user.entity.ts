import { IsEmail, IsString } from 'class-validator';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @IsString()
  @Column({ length: 100 })
  name: string;

  @IsEmail()
  @Column({ length: 100 })
  email: string;

  @OneToMany(() => Booking, booking => booking.user)
  bookings: Booking[];
}
