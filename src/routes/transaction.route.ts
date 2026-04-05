import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import { restrictTo } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createTransactionSchema, updateTransactionSchema } from '../validations/transaction.validation';
import * as transactionController from '../controllers/transaction.controller';

const router = Router();

router.use(protect); // All routes require login

// Viewers, Analysts and Admins can view
router.get('/', transactionController.getTransactions);
router.get('/:id', transactionController.getTransactionById);

// Only ADMIN can create/update/delete
router.use(restrictTo('ADMIN'));
router.post('/', validate(createTransactionSchema), transactionController.createTransaction);
router.put('/:id', validate(updateTransactionSchema), transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

export default router;
