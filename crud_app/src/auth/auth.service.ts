import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService, // Inject ConfigService
    ) { }

    // Registration logic remains the same
    async register(email: string, password: string): Promise<User> {
        console.log('Registering user:', email);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ email, password: hashedPassword });
        return await this.userRepository.save(user);
    }

    async login(email: string, password: string): Promise<{ user: User; token: string } | null> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            console.error('User not found with email:', email);
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.error('Password does not match for user:', email);
            return null;
        }

        try {
            const secret = this.configService.get<string>('JWT_SECRET') || 'your_secret_key';
            const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });

            // Save the token in the user entity
            user.token = token;
            await this.userRepository.save(user);

            return { user, token };
        } catch (error) {
            console.error('Error generating JWT:', error);
            return null;
        }
    }

    async verifyToken(email: string, authorizationHeader?: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email } });
        const token = authorizationHeader?.split(' ')[1]; // Get the token from the Bearer scheme

        return user && user.token === token;
    }
}
