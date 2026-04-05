import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as dashboardService from '../services/dashboard.service';

export const getSummary = catchAsync(async (req: Request, res: Response) => {
  const summary = await dashboardService.getDashboardSummary();
  res.status(200).json({ status: 'success', data: summary });
});

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await dashboardService.getCategoryTotals();
  res.status(200).json({ status: 'success', data: categories });
});

export const getRecent = catchAsync(async (req: Request, res: Response) => {
  const activities = await dashboardService.getRecentActivity();
  res.status(200).json({ status: 'success', data: activities });
});

export const getTrends = catchAsync(async (req: Request, res: Response) => {
  const trends = await dashboardService.getTrends();
  res.status(200).json({ status: 'success', data: trends });
});
