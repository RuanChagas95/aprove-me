import { User } from '@prisma/client';
import { Request } from 'express';

export type RequestWithPassword = {
  hashPassword: string;
} & Request;

export type CommonUser = Omit<User, 'password'>;
