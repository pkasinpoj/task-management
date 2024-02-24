import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaskStatus } from './task-status-enum';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string; // แก้ชนิดข้อมูลเป็น string ตาม UUID

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
