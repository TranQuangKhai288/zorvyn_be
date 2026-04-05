import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as userService from "../services/user.service";

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  const results = await userService.getAllUsers(page, limit);
  res.status(200).json({
    status: "success",
    data: results.data,
    pagination: results.pagination,
  });
});

export const updateRole = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUserRole(
    req.params.id as string,
    req.body.role,
  );
  res.status(200).json({ status: "success", data: user });
});

export const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUserStatus(
    req.params.id as string,
    req.body.status,
  );
  res.status(200).json({ status: "success", data: user });
});
