import { prisma } from '../config/db';
import { AppError } from '../utils/AppError';

export const createTransaction = async (data: any, createdById: string) => {
  return await prisma.transaction.create({
    data: {
      ...data,
      createdById
    }
  });
};

export const getTransactions = async (filters: { type?: string, category?: string, startDate?: string, endDate?: string }) => {
  const query: any = { isDeleted: false };
  if (filters.type) query.type = filters.type;
  if (filters.category) query.category = filters.category;
  if (filters.startDate || filters.endDate) {
    query.date = {};
    if (filters.startDate) query.date.gte = new Date(filters.startDate);
    if (filters.endDate) query.date.lte = new Date(filters.endDate);
  }

  return await prisma.transaction.findMany({
    where: query,
    orderBy: { date: 'desc' }
  });
};

export const getTransactionById = async (id: string) => {
  const transaction = await prisma.transaction.findFirst({
    where: { id, isDeleted: false }
  });
  if (!transaction) throw new AppError(404, 'Transaction not found');
  return transaction;
};

export const updateTransaction = async (id: string, data: any) => {
  const transaction = await prisma.transaction.findUnique({ where: { id } });
  if (!transaction) throw new AppError(404, 'Transaction not found');

  return await prisma.transaction.update({
    where: { id },
    data
  });
};

export const deleteTransaction = async (id: string, hard: boolean = false) => {
  const transaction = await prisma.transaction.findUnique({ where: { id } });
  if (!transaction) throw new AppError(404, 'Transaction not found');

  if (hard) {
    return await prisma.transaction.delete({ where: { id } });
  } else {
    return await prisma.transaction.update({
      where: { id },
      data: { isDeleted: true }
    });
  }
};
