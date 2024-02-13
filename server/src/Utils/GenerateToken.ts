import express, { Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken';

const key = process.env.JWT_SECRETE_KEY;
const environment = process.env.NODE_ENV;

const generateToken = (res: Response, user_id: number) => {

    const token = jwt.sign({user_id}, key!,{
        expiresIn: '1d'
    });

    res.cookie('jwt', token,{
        httpOnly:true,
        secure: environment != 'development',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    })
}

export default generateToken;