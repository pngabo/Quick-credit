import express from 'express';
import loanController from '../controllers/loan/loanController';
import applyLoan from '../controllers/loan/applyLoan';
import approveLoan from '../controllers/loan/approveLoan';

const router = express.Router();

router.get('/api/v1/loans', loanController.getLoans);
router.get('/api/v1/loans/:id', loanController.getLoan);
router.post('/api/v1/loans', applyLoan.loanApply);
router.patch('/api/v1/loans/:id',approveLoan.approve);
export default router;