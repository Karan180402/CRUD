import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import { join } from 'path';
import { ReactMiddleware } from './react.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Session middleware
  app.use(session({
    secret: 'karan',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000, // 1 hour
    },
  }));

  // Serve React static files
  const reactAppPath = join(__dirname, '..', 'New Folder', 'react-app', 'dist');
  app.use(express.static(reactAppPath));

  // Use the React middleware for all routes not matched by other routes
  app.use(new ReactMiddleware().use);

  // Start listening on port 4000
  await app.listen(4000);
}

bootstrap();
