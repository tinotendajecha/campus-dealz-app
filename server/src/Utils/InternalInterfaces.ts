import { Request } from "express";


export interface AuthenticatedRequest extends Request {
    user?: {
      id: number;
      username: string;
      email: string;
      password: string;
      firstname: string;
      lastname: string;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  }