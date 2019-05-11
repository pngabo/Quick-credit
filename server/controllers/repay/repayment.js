import repayments from '../../models/repaymentDb';
import loandb from '../../models/loanDb';
import moment from 'moment';

class RepaymentController {
    repayLoan(req, res) {
        const loanId = parseInt(req.params.id, 10);
        const paidAmount = Number(req.body.paidAmount);
        const loan = loandb.find(item => item.id === loanId);
        if (!loan) {
            return res.status(400).json({
                status: 400,
                error: 'Loan with that Id not found',
            });
        }
        if (loan.repaid) {
            return res.status(400).json({
                status: 400,
                error: 'You have fully paid your loan already',
            });
        }
        const newBalance = Number(loan.balance - paidAmount).toFixed(2);
        loan.balance = newBalance;
        if (newBalance === 0) {
            loan.repaid = true;
        }
        const repayment = {
            id: repayments.length + 100,
            loanId,
            email: loan.email,
            paidOn: moment(new Date()).format('YYYY-MM-DD HH:MM:SS'),
            paidAmount,
            amount: loan.amount,
            monthlyInstallment: loan.paymentInstallment,
            balance: loan.balance,
        };
        repayments.push(repayment);
        return res.status(201).json({
            status: 201,
            data: repayment,
        });
    }

    getRepayment(req, res) {
        const {
            id
        } = req.params;
        const data = repayments.find(repayment => repayment.id === parseInt(id, 10));
        if (data) {
            const newData = {
                loanId: data.loanId,
                email: data.email,
                createdOn: data.createdOn,
                paymentInstallment: data.paymentInstallment,
                amount: data.amount,
                balance: data.balance,
            };
            return res.status(200).send({
                status: 200,
                data: [newData],
            });
        }
        return res.status(404).send({
            status: 404,
            error: 'No Loan with that id found!',
        });
    }
}
const repaymentController = new RepaymentController();
export default repaymentController;