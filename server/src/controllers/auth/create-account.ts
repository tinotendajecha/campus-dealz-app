import { RequestHandler, Request, Response, NextFunction } from "express";
import prisma from "../../db/connection";

const signup: RequestHandler = async(req: Request, res:Response, next:NextFunction) => {
    const { username, email, password, firstname, lastname }  = req.body

    const User = await prisma.user.create({
        data : {
            username,
            email, 
            password, 
            firstname, 
            lastname
        }
    })
    res.status(200).json({
        message : "Test user created succesfully",
        data : User
    })
}

export default signup;