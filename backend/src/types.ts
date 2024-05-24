import { UUID } from 'crypto';
import { Request } from 'express';

export type RequestWithPassword = {
  hashPassword: string;
} & Request;

export type CommonUser = {
  id: UUID;
  email: string;
  name: string;
  document: string;
  phone: string;
};

export type AuthenticatedRequest = {
  user: CommonUser;
} & Request;
