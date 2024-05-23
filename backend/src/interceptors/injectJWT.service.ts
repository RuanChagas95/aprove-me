import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { generateJWT } from 'src/utils/jwt';

@Injectable()
export class InjectJwtInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        if (data) {
          const token = generateJWT(data);
          data.token = token;
        }
      }),
    );
  }
}
