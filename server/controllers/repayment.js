import repayments from '../models/repaymentDb';
import loandb from '../models/loanDb';
import moment from 'moment';

class RepaymentController {
   static repayLoan(req, res) {
       try {
        const loanId = parseInt(req.params.id, 10);
        const paidAmount = Number(req.body.paidAmount);
        const getLoan = loandb.find(item => item.id === loanId);
        if (getLoan) {
            if (parseFloat(getLoan.balance) < paidAmount) {
                return res.status(400).json({
                    status: 400,
                    message: 'you have already fully paid your loan !',
                });
            }
            if (getLoan.status != 'approved') {
                return res.status(400).json({
                    status: 400,
                    message: 'This loan can only be repiid when it is approved!',
                });
            }
            const newBalance = Number(getLoan.balance - paidAmount).toFixed(2);
            getLoan.balance = newBalance;

            const repayment = {
                id: repayments.length + 1,
                loanId,
                email: getLoan.email,
                paidOn: moment(new Date()).format('YYYY-MM-DD HH:MM:SS'),
                paidAmount,
                amount: getLoan.amount,
                monthlyInstallment: getLoan.paymentInstallment,
                balance: getLoan.balance,
            };
            repayments.push(repayment);
            if (newBalance == 0) {
                getLoan.repaid = true;
            }
            return res.status(201).json({
                status: 201,
                data: repayment,
            });
        }
       } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Internal Server error',
        });
       } 
    }

   static getrepayments(req, res) {
        return res.status(200).json({
            status: 200,
            message: 'LIST OF ALL REPAYMENTS',
            repayments,
        });
    }
  static  getLoanPayment(req, res) {
        const {
            id
        } = req.params;
        const getpayment = repayments.filter(payment => payment.loanId === parseInt(id,10));
        if (getpayment.length >= 1) {
            return res.status(200).json({
                status: 200,
                message: 'PAYMENT DETAILS',
                getpayment,
            });
        } else {
            res.status(400).json({
                status: 400,
                error: 'NO PAYMENT FOUND',
            });
        }
    }
}
export default RepaymentController;