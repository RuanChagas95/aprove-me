import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { RequestWithPassword } from 'src/types';

@Injectable()
export class EncryptPasswordMiddleware implements NestMiddleware {
  use(req: RequestWithPassword, _res: Response, next: NextFunction) {
    if (req.body.password) {
      const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || 10);
      req.hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
    }
    next();
  }
}
