import express from 'express';
import RepaymentController from '../controllers/repayment';

const router = express.Router();

router.post('/api/v1/loans/:id/repayments', RepaymentController.repayLoan);

export default router;