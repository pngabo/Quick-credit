import Validation from '../helpers/validation';
import Loans from '../models/loan';
import Repayments from '../models/repayment';
import pool from '../models/connectdb';
import queries from '../models/queries';
import moment from 'moment';

class RepaymentController {
    static async repayLaon(req, res) {
        const loanId = parseInt(req.params.id);
        
        const paidamount = req.body.paidamount;
        const {error} = Validation.validPaidamount(req.body);
        if(error){
            return res.status(400).json({
                status:400,
                error: error.details[0].message,
            });
        }
        try {
            const findLoan = await Loans.getOneLoan(loanId);

        if (findLoan.length === 0) {
            return res.status(404).json({
                status: 404,
                error: 'Loan does not exist',
            });
        }

        if (findLoan[0].status !== 'approved') {
            return res.status(400).json({
                status: 400,
                error: 'Loan is not approved',
            });
        }
        if (findLoan[0].repaid) {
            return res.status(400).json({
                status: 400,
                error: 'Loan already repaid',
            });
        }
        if (paidamount > findLoan[0].balance) {
            return res.status(400).json({
                status: 400,
                error: 'You are trying much than you left with your loan',
            });
        }
        const createdOn = moment(new Date());
        const balance = (findLoan[0].balance - paidamount);
        const installment = findLoan[0].installment;
        const amount = findLoan[0].amount;
        const email = findLoan[0].email;
        const newRepayment = [
            loanId,
            email,
            paidamount,
            installment,
            amount,
            balance,
            createdOn
        ];
        const newBalance = await pool.query(queries.createRepayment, newRepayment);
        const updateLoan = await Loans.updateLoanBalance(loanId, balance);
        if (balance === 0) {
            const updateStatus = await pool.query(queries.updateStatus, [true, loanId])
        }
        return res.status(200).json({
            status: 200,
            data: newBalance.rows[0],
        });
        } catch (error) {
            return res.status(500).json({
                status: 500,
               error: 'INTERNAL SERVER ERROR'
            });
        }
        
    }
    static async getLoanRepayments(req, res) {
        try {
            const getRepayment = await Repayments.getRepayment(req.params.loanId);
            if(getRepayment.rows.length===0){
                return res.status(404).json({
                    status: 404,
                    error: 'NO REPAYMENT FOUND WITH THAT LOAN ID'
                });
            }
        
            return res.status(200).json({
                status: 200,
                data: getRepayment.rows,
            }); 
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error:'INTERNAL SERVER ERROR'
            }); 
        }
        
    }
}
export default RepaymentController;