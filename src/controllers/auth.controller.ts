import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as authService from '../services/auth.service';

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await authService.registerUser(email, password);
  res.status(201).json({ status: 'success', data });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await authService.loginUser(email, password);
  res.status(200).json({ status: 'success', data });
});
