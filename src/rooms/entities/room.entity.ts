import { Session } from 'src/sessions/entities/session.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  room_id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  num_columns: number;

  @Column()
  num_rows: number;

  @OneToMany(() => Workspace, workspace => workspace.room)
  workspaces: Workspace[];

  @OneToMany(() => Session, session => session.room)
  sessions: Session[];
}
