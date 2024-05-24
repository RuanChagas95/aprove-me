import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonUser } from '../types';
import { generateJWT } from '../utils/jwt';

@Injectable()
export class InjectJwtInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        if (data) {
          const user = data.user as CommonUser;
          const token = generateJWT(user);
          data.token = token;
        }
      }),
    );
  }
}
