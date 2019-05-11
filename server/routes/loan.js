import express from 'express';
import oneloan from '../controllers/loan/oneLoan';
import allLoans from '../controllers/loan/allLoans';
import applyLoan from '../controllers/loan/applyLoan';
import approveLoan from '../controllers/loan/approveLoan';

const router = express.Router();

router.get('/api/v1/loans', allLoans.getLoans);
router.get('/api/v1/loans/:id', oneloan.getLoan);
router.post('/api/v1/loans', applyLoan.loanApply);
router.patch('/api/v1/loans/:id',approveLoan.approve);
export default router;