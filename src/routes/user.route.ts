import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import { restrictTo } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import { updateRoleSchema, updateStatusSchema } from '../validations/user.validation';
import * as userController from '../controllers/user.controller';

const router = Router();

// Only ADMIN can manage users
router.use(protect);
router.use(restrictTo('ADMIN'));

router.get('/', userController.getAllUsers);
router.put('/:id/role', validate(updateRoleSchema), userController.updateRole);
router.put('/:id/status', validate(updateStatusSchema), userController.updateStatus);

export default router;
