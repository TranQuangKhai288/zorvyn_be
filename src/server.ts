import app from './app';
import { ENV } from './config/env';
import { prisma } from './config/db';

const startServer = async () => {
  try {
    // Attempt to connect to DB (if connection string is valid)
    await prisma.$connect();
    console.log('📦 Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed. Please check your .env file.', error);
    // Don't exit process, allow the app to boot without DB for now so the user can replace .env later
  }

  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${ENV.PORT}`);
  });
};

startServer();
