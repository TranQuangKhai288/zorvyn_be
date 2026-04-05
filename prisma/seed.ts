import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database cleanup and seeding...');

  // Clear existing data to prevent duplication
  await prisma.transaction.deleteMany();
  await prisma.user.deleteMany();

  // Create common password (password123)
  const masterPassword = await bcrypt.hash('password123', 10);

  // 1. Create 3 users representing the 3 roles
  const admin = await prisma.user.create({
    data: { email: 'admin@demo.com', password: masterPassword, role: 'ADMIN' }
  });
  console.log(`✅ Created Admin: ${admin.email}`);

  const analyst = await prisma.user.create({
    data: { email: 'analyst@demo.com', password: masterPassword, role: 'ANALYST' }
  });
  console.log(`✅ Created Analyst: ${analyst.email}`);

  const viewer = await prisma.user.create({
    data: { email: 'viewer@demo.com', password: masterPassword, role: 'VIEWER' }
  });
  console.log(`✅ Created Viewer: ${viewer.email}`);

  // 2. Create 10 sample transactions
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 15); // A day from last month to test Trends

  const fakeTransactions = [
    // Salaries and income
    { amount: 15000, type: 'INCOME', category: 'Salary', date: now, createdById: admin.id, notes: 'Salary this month' },
    { amount: 5000, type: 'INCOME', category: 'Freelance', date: now, createdById: admin.id, notes: 'Website project' },
    { amount: 14000, type: 'INCOME', category: 'Salary', date: lastMonth, createdById: admin.id, notes: 'Salary last month' },

    // Expenses and shopping
    { amount: 2000, type: 'EXPENSE', category: 'Food', date: now, createdById: admin.id, notes: 'Supermarket' },
    { amount: 150, type: 'EXPENSE', category: 'Transport', date: now, createdById: admin.id, notes: 'Taxi fare' },
    { amount: 800, type: 'EXPENSE', category: 'Utilities', date: now, createdById: admin.id, notes: 'Electricity bill' },
    { amount: 450, type: 'EXPENSE', category: 'Entertainment', date: now, createdById: admin.id, notes: 'Movie tickets' },
    { amount: 3000, type: 'EXPENSE', category: 'Rent', date: now, createdById: admin.id, notes: 'Office rent' },
    
    // Test records for last month
    { amount: 4000, type: 'EXPENSE', category: 'Shopping', date: lastMonth, createdById: admin.id, notes: 'Clothes shopping' },
    { amount: 800, type: 'EXPENSE', category: 'Food', date: lastMonth, createdById: admin.id, notes: 'Restaurant dinner' },
  ];

  // @ts-ignore
  await prisma.transaction.createMany({ data: fakeTransactions });
  console.log(`✅ Loaded 10 sample transactions into the system!`);

  console.log('🎉 Seeding completed! You can start the demo.');
}

main()
  .catch(e => {
    console.error('❌ An error occurred during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
