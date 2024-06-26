import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt';
import { AuthenticatedRequest } from '../types';

@Injectable()
export class VerifyAuth implements NestMiddleware {
  use(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      const token = req.headers['authorization'].replace('Bearer ', '');
      const payload = verifyJWT(token);
      req.user = payload;
      const id = req.params.id;

      if (id && payload.id !== id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      return next();
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
