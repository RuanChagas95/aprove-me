import { HttpException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CommonUser } from 'src/types';

export const generateJWT = (payload: CommonUser) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '60s' });
};

export const verifyJWT = (token: string): CommonUser => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET) as CommonUser;
  } catch (error) {
    throw new HttpException('Invalid token', 401);
  }
};
