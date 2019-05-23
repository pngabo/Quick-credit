import express from 'express';
import RepaymentController from '../controllers/repayment';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/api/v1/loans/:id/repayments', auth.isAuth,auth.adminAccess, RepaymentController.repayLaon);
router.get('/api/v1/loans/:id/repayment',auth.isAuth,auth.adminAccess, RepaymentController.getLoanRepayments);

export default router;