import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class ReactMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        if (req.path.startsWith('/auth') || req.path.startsWith('/todos') || req.path.startsWith('/api')) {
            return next();
        }

        const filePath = join(__dirname, '..', 'New Folder', 'react-app', 'dist', 'index.html');
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.status(404).send('File not found');
            } else {
                res.sendFile(filePath);
            }
        });
    }
}    
