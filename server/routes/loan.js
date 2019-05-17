import express from 'express';
import oneloan from '../controllers/loan/oneLoan';
import applyLoan from '../controllers/loan/applyLoan';
import approveLoan from '../controllers/loan/approveLoan';
import loanData from '../controllers/loan/getLoans';

const router = express.Router();

router.get('/api/v1/loans/:id', oneloan.getLoan);
router.post('/api/v1/loans', applyLoan.loanApply);
router.patch('/api/v1/loans/:id', approveLoan.approve);
router.get('/api/v1/loans', loanData.getCurrentLoans);

export default router;