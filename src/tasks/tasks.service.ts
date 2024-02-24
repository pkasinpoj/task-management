import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}
  //   getAllTask(): Task[] {
  //     return this.task;
  //   }
  //   getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
  //     const { status, search } = filterDto;
  //     let tasks = this.getAllTask();
  //     if (status) {
  //       tasks = tasks.filter((task) => task.status === status);
  //     }
  //     if (search) {
  //       tasks = tasks.filter((task) => {
  //         if (task.title.includes(search) || task.description.includes(search)) {
  //           return true;
  //         }
  //         return false;
  //       });
  //     }
  //     return tasks;
  //   }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`); // เพิ่ม ' ที่สิ้นสุดข้อความ
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepository.save(task);
    return task;
  }
  //   getTaskById(id: string): Task {
  //     const found = this.task.find((item) => item.id === id);
  //     if (!found) {
  //       throw new NotFoundException(`Task with ID "${id} not found`);
  //     }
  //     return found;
  //   }
  //   createTask(createTaskDto: CreateTaskDto): Task {
  //     const { title, description } = createTaskDto;
  //     const task: Task = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     };
  //     this.task.push(task);
  //     return task;
  //   }
  //   deleteTaskById(id: string): void {
  //     // My Idea
  //     // const index = this.task.findIndex((item) => item.id === id);
  //     // if (index !== -1) {
  //     //   this.task.splice(index, 1);
  //     //   return this.task; // บอกว่าลบสำเร็จ
  //     // }
  //     // My teacher
  //     this.getTaskById(id);
  //     this.task = this.task.filter((task) => task.id !== id);
  //   }
  //   updateTaskStatus(id: string, status: TaskStatus) {
  //     const task = this.getTaskById(id);
  //     task.status = status;
  //     return task;
  //   }
}
