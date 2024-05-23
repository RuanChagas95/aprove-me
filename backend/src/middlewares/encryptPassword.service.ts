import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body.password) {
      const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || 10);
      res.locals.password = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
    }
    next();
  }
}
