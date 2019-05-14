import express from 'express';
import repayment from '../controllers/repay/repayment';

const router = express.Router();

router.post('/api/v1/loans/:id/repayments', repayment.repayLoan);

export default router;