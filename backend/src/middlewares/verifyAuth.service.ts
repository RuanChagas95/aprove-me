import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from 'src/utils/jwt';

@Injectable()
export class VerifyAuth implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      const token = req.headers['authorization'].replace('Bearer ', '');
      const payload = verifyJWT(token);
      res.locals.payload = payload;
    }
    next();
  }
}
