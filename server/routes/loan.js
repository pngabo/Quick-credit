import express from 'express';
import LoanController from '../controllers/loanController';
import auth from '../middleware/auth';


const router = express.Router();

router.get('/api/v1/loans/:id',auth.isAuth,auth.adminAccess, LoanController.getOneLoan);
router.post('/api/v1/loans', LoanController.applyLoan);
router.patch('/api/v1/loans/:id',auth.isAuth,auth.adminAccess, LoanController.loanApproval);
router.get('/api/v1/loans', auth.isAuth,auth.adminAccess, LoanController.getAllLoansByStatus);

export default router;