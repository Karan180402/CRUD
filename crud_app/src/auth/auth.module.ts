import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ConfigModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
