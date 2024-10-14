import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) { }

    async create(dto: CreateTodoDto) {
        const todo = this.todoRepository.create(dto);
        return await this.todoRepository.save(todo);
    }

    async findAll(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    async findOne(id: number): Promise<Todo> {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }

    async update(id: number, dto: CreateTodoDto): Promise<Todo> {
        const todo = await this.findOne(id);
        Object.assign(todo, dto);
        return await this.todoRepository.save(todo);
    }

    async remove(id: number): Promise<void> {
        const todo = await this.findOne(id);
        await this.todoRepository.remove(todo);
    }
}
