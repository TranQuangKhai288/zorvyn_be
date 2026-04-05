import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as userService from '../services/user.service';

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.status(200).json({ status: 'success', data: users });
});

export const updateRole = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUserRole(req.params.id as string, req.body.role);
  res.status(200).json({ status: 'success', data: user });
});

export const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUserStatus(req.params.id as string, req.body.status);
  res.status(200).json({ status: 'success', data: user });
});
