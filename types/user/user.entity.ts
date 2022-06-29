import { Request } from 'express';

export interface UserEntity {
  id: string;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}

interface UserPayload {
  sub: string;
  iat: number;
  exp: number;
}

export interface UserAuthRequest extends Request {
  user: UserPayload;
}

export interface UserDataResponse {
  email: string;
  firstname?: string;
  lastname?: string;
}
