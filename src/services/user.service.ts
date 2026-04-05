import { prisma } from '../config/db';
import { AppError } from '../utils/AppError';

export const getAllUsers = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  
  const [total, users] = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({
      skip,
      take: limit,
      select: { id: true, email: true, role: true, status: true, createdAt: true },
      orderBy: { createdAt: 'desc' }
    })
  ]);

  return {
    data: users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const updateUserRole = async (id: string, role: any) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AppError(404, 'User not found');

  return await prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, email: true, role: true }
  });
};

export const updateUserStatus = async (id: string, status: any) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AppError(404, 'User not found');

  return await prisma.user.update({
    where: { id },
    data: { status },
    select: { id: true, email: true, status: true }
  });
};
