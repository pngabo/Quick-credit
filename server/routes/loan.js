import express from 'express';
import LoanController from '../controllers/loanController';


const router = express.Router();

router.get('/api/v1/loans/:id', LoanController.getOneLoan);
router.post('/api/v1/loans', LoanController.applyLoan);
router.patch('/api/v1/loans/:id', LoanController.loanApproval);
router.get('/api/v1/loans', LoanController.getAllLoanApps);

export default router;