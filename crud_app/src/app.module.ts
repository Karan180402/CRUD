import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { User } from './auth/user.entity';
import { Todo } from './todos/todo.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'crud_db',
      entities: [User, Todo],
      synchronize: true,
    }),
    AuthModule,
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
