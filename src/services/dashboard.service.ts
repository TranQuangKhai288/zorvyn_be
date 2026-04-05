import { prisma } from '../config/db';

export const getDashboardSummary = async () => {
  const incomes = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: 'INCOME', isDeleted: false }
  });
  
  const expenses = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: 'EXPENSE', isDeleted: false }
  });

  const totalIncome = Number(incomes._sum.amount || 0);
  const totalExpense = Number(expenses._sum.amount || 0);
  const netBalance = totalIncome - totalExpense;

  return { totalIncome, totalExpense, netBalance };
};

export const getCategoryTotals = async () => {
  const categoriesDb = await prisma.transaction.groupBy({
    by: ['category', 'type'],
    _sum: { amount: true },
    where: { isDeleted: false }
  });

  return categoriesDb.map(c => ({
    category: c.category,
    type: c.type,
    total: Number(c._sum.amount || 0)
  }));
};

export const getRecentActivity = async (limit: number = 5) => {
  return await prisma.transaction.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      createdBy: { select: { email: true } }
    }
  });
};

export const getTrends = async () => {
  // Simple trend: getting current month total vs last month total
  const now = new Date();
  const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const thisMonthIncome = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: 'INCOME', date: { gte: firstDayThisMonth }, isDeleted: false }
  });

  const lastMonthIncome = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: 'INCOME', date: { gte: firstDayLastMonth, lt: firstDayThisMonth }, isDeleted: false }
  });

  return {
    thisMonthIncome: Number(thisMonthIncome._sum.amount || 0),
    lastMonthIncome: Number(lastMonthIncome._sum.amount || 0),
  };
};
