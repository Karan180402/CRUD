import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: { email: string; password: string }, @Res() res: Response) {
        console.log('Registration request received:', body);
        try {
            await this.authService.register(body.email, body.password);
            return res.status(201).json({ message: 'Registration successful!' });
        } catch (error) {
            console.error('Registration error:', error);
            return res.status(400).json({ message: error.message || 'Registration failed. Please try again.' });
        }
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }, @Res() res: Response) {
        const { email, password } = body;
        try {
            const { user, token } = await this.authService.login(email, password);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            return res.status(200).json({
                message: 'Login successful',
                token,
                email: user.email, // Include the user's email in the response
            });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Post('logout')
    logout(@Res() res: Response) {
        return res.status(200).json({ message: 'Logout successful' });
    }

    @Post('verify-token')
    async verifyToken(@Body() body: { email: string }, @Req() req: Request, @Res() res: Response) {
        const { email } = body;
        const isValid = await this.authService.verifyToken(email, req.headers.authorization);

        if (isValid) {
            return res.json({ isValid: true });
        }
        return res.status(401).json({ isValid: false });
    }
}
