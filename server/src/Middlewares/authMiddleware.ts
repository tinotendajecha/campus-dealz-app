import jwt, { Jwt } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import prisma from "../db/connection";
import { AuthenticatedRequest } from "../Utils/InternalInterfaces";
import { NextFunction,  Response } from "express";
const key: any = process.env.JWT_SECRETE_KEY;

const authenticate = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (token) {
      try {
        const decoded: any = jwt.verify(token, key!);

        const user = await prisma.user.findUnique({
          where: {
            id: decoded.user_id,
          },
        });

        req.user = user

        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not Authorized, no token");
    }
  }
);

export { authenticate };
