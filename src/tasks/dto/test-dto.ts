import { Exclude, Expose, Transform } from 'class-transformer';
import { TaskStatus } from '../task-status-enum';

export class ResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Exclude()
  status: TaskStatus;
}
