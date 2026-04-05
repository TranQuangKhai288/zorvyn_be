import { prisma } from "../config/db";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export const registerUser = async (email: string, passwordRaw: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError(400, "Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(passwordRaw, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Automatically designate the first user as ADMIN (for easy testing/assignment purpose)
  const isFirstUser = (await prisma.user.count()) === 1;
  if (isFirstUser) {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: "ADMIN" },
    });
    user.role = "ADMIN";
  }

  const token = generateToken({ id: user.id, role: user.role });
  return { user: { id: user.id, email: user.email, role: user.role }, token };
};

export const loginUser = async (email: string, passwordRaw: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.status === "INACTIVE") {
    throw new AppError(401, "Invalid credentials or inactive account");
  }

  const isMatch = await bcrypt.compare(passwordRaw, user.password);
  if (!isMatch) {
    throw new AppError(401, "Invalid credentials");
  }

  const token = generateToken({ id: user.id, role: user.role });
  return { user: { id: user.id, email: user.email, role: user.role }, token };
};
