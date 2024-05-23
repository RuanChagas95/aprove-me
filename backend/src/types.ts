import { Request } from 'express';

export type RequestWithPassword = {
  hashPassword: string;
} & Request;
