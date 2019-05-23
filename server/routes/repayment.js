import express from 'express';
import RepaymentController from '../controllers/repayment';

const router = express.Router();

router.post('/api/v1/loans/:id/repayments', RepaymentController.repayLaon);
router.get('/api/v1/loans/:id/repayment', RepaymentController.getLoanRepayments);

export default router;