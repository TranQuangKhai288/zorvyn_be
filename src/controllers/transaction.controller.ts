import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as transactionService from "../services/transaction.service";

export const createTransaction = catchAsync(
  async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user.id;
    const transaction = await transactionService.createTransaction(
      req.body,
      userId,
    );
    res.status(201).json({ status: "success", data: transaction });
  },
);

export const getTransactions = catchAsync(
  async (req: Request, res: Response) => {
    const filters = {
      type: req.query.type as string,
      category: req.query.category as string,
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
    };
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const results = await transactionService.getTransactions(
      filters,
      page,
      limit,
    );
    res.status(200).json({
      status: "success",
      data: results.data,
      pagination: results.pagination,
    });
  },
);

export const getTransactionById = catchAsync(
  async (req: Request, res: Response) => {
    const transaction = await transactionService.getTransactionById(
      req.params.id as string,
    );
    res.status(200).json({ status: "success", data: transaction });
  },
);

export const updateTransaction = catchAsync(
  async (req: Request, res: Response) => {
    const transaction = await transactionService.updateTransaction(
      req.params.id as string,
      req.body,
    );
    res.status(200).json({ status: "success", data: transaction });
  },
);

export const deleteTransaction = catchAsync(
  async (req: Request, res: Response) => {
    const isHardDelete = req.query.hard === "true";
    await transactionService.deleteTransaction(
      req.params.id as string,
      isHardDelete,
    );
    res.status(204).json({ status: "success", data: null });
  },
);
