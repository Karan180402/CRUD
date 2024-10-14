import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    @Post('create')
    create(@Body() dto: CreateTodoDto): Promise<Todo> {
        return this.todosService.create(dto);
    }

    @Get('view')
    findAll(): Promise<Todo[]> {
        return this.todosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Todo> {
        return this.todosService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: CreateTodoDto): Promise<Todo> {
        return this.todosService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.todosService.remove(id);
    }
}
