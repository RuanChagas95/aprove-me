import { HttpException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const generateJWT = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '60s' });
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new HttpException('Invalid token', 401);
  }
};
