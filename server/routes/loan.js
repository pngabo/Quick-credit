import express from 'express';
import LoanController from '../controllers/loanController';


const router = express.Router();

router.get('/api/v1/loans/:id', LoanController.getLoan);
router.post('/api/v1/loans', LoanController.loanApply);
router.patch('/api/v1/loans/:id', LoanController.approve);
router.get('/api/v1/loans', LoanController.getCurrentLoans);

export default router;