import express, { RequestHandler, Response } from "express";
import prisma from "../db/connection";
import asyncHanndler from "express-async-handler";
import generateToken from "../Utils/GenerateToken";
import { hashservice } from "../Utils/HashData";
import { AuthenticatedRequest } from "../Utils/InternalInterfaces";

//create new user
const createUser: RequestHandler = asyncHanndler(
  async (req: AuthenticatedRequest, res: Response) => {
    const hash_password = hashservice(req.body.password);

    const user = {
      username: req.body.username,
      password: hash_password,
      firstname: req.body.first_name,
      lastname: req.body.last_name,
      email: req.body.email_address,
    };

    const find_user = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

    if (find_user) {
      res.status(400);
      throw new Error("User already exists");
    }

    const new_user = await prisma.user.create({
      data: user,
    });

    if (new_user) {
      generateToken(res, new_user.id);

      res.status(201).json({
        first_name: new_user.firstname,
        last_name: new_user.lastname,
        email_address: new_user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

//login user
const loginUser: RequestHandler = asyncHanndler(
  async (req: AuthenticatedRequest, res: Response) => {
    const hash_password = hashservice(req.body.password);

    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email_address,
    };

    const find_user = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (find_user && find_user.password === hash_password) {
      generateToken(res, find_user.id);

      res.status(201).json({
        first_name: find_user.firstname,
        last_name: find_user.lastname,
        email_address: find_user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  }
);

//update user profile
const updateUserProfile: RequestHandler = asyncHanndler(
  async (req: AuthenticatedRequest, res: Response) => {
    let hash_password: string;
    let user: object;

    const reqUser = req.user;

    const find_user = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
    });

    if (req.body.password && find_user) {
      hash_password = hashservice(req.body.password);

      await prisma.user.update({
        where: {
          id: find_user.id,
        },
        data: {
          password: hash_password,
        },
      });

      res.status(200);
    }

    if (find_user) {
      user = {
        username: req.body.username || find_user.username,
        firstname: req.body.firstname || find_user.firstname,
        lastname: req.body.lastname || find_user.lastname,
        email: req.body.email || find_user.email,
      };

      const updatedUser = await prisma.user.update({
        where: {
          id: find_user.id,
        },
        data: user,
      });

      res.status(200).json(updatedUser);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

export { createUser, loginUser, updateUserProfile };
