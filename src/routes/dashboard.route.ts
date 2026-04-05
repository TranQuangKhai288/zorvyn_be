import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';
import { restrictTo } from '../middlewares/role.middleware';
import * as dashboardController from '../controllers/dashboard.controller';

const router = Router();

router.use(protect);
// Viewer is not allowed to see dashboard summaries, only Analyst and Admin
router.use(restrictTo('ANALYST', 'ADMIN'));

router.get('/summary', dashboardController.getSummary);
router.get('/categories', dashboardController.getCategories);
router.get('/recent-activity', dashboardController.getRecent);
router.get('/trends', dashboardController.getTrends);

export default router;
