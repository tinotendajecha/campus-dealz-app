import { NextFunction, RequestHandler, Request, Response } from "express";
import prisma from "../../db/connection";

const login: RequestHandler = (req: Request, res:Response, next:NextFunction) => {
    res.send('Login endpoint!!')
}

export default login
