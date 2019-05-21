import loanDb from '../models/loanDb';
import appValidation from '../helpers/validation';
import moment from 'moment';

class LoanController {
    static loanApply(req, res) {
        const {
            error
        } = appValidation.applyValidation(req.body);
        if (error) return res.status(400).json(error.details[0].message);
        const {
            email,
            tenor,
            amount
        } = req.body;
        const id = loanDb.length + 1;
        const interest = 0.05 * parseInt(amount, 10).toFixed(2);
        const paymentInstallment = (parseInt(amount, 10) + parseInt(interest, 10)).toFixed(2) / parseInt(tenor, 10).toFixed(2);
        const balance = parseInt(amount, 10).toFixed(2);
        const loan = {
            id,
            email,
            amount,
            tenor,
            paymentInstallment,
            balance,
            status: 'pending',
            repaid: false,
            createdOn: moment(new Date()).format('YYYY-MM-DD HH:MM:SS'),
        };
        if (loanDb.find(user => user.email === req.body.email)) {
            return res.status(409).send({
                status: '409',
                error: 'You have already applied for loan!',
            });
        }
        loanDb.push(loan);
        return res.status(201).json({
            status: 201,
            message: "loan created successfully",
            data: loan,
        });
    }
    static approve(req, res) {
        const {
            error
        } = appValidation.validateLoanStatus(req.body);
        if (error) return res.status(400).json(error.details[0].message);
        const {
            id
        } = req.params;
        const data = loanDb.find(loan => loan.id === parseInt(id, 10));
        if (data) {
            data.status = req.body.status;
            const newData = {
                loanId: data.id,
                loanAmount: data.amount,
                tenor: data.tenor,
                monthlyInstallments: data.paymentInstallment,
                status: data.status,
                interest: data.interest,
            };
            return res.status(200).send({
                status: 200,
                data: [newData],
            });
        }
        return res.status(404).send({
            status: 404,
            error: 'No Loan with that id exist on database',
        });
    }
    static getCurrentLoans(req, res) {
        if (Object.keys(req.query).length === 0) {
            return res.status(200).json({
                message: 'ALL CLIENT LOANS',
                status: 200,
                data: loanDb,
            });
        }
        const repaidLoans = loanDb.filter(loan => loan.status === req.query.status && loan.repaid.toString() === req.query.repaid);
        if (req.query.status === 'approved' && req.query.repaid === 'true') {
            return res.status(200).json({
                status: 200,
                data: repaidLoans,
                message: 'All fully repaid loans',
            });
        }
        const unrepaidLoans = loanDb.filter(loan => loan.status === req.query.status && loan.repaid.toString() === req.query.repaid);
        if (req.query.status === 'approved' && req.query.repaid === 'false') {
            return res.status(200).json({
                status: 200,
                data: unrepaidLoans,
                message: 'ALL CURRENT LOANS',
            });
        }
    }
    static getLoan(req, res) {
        const id = parseInt(req.params.id, 10);
        loanDb.map(loan => {
            if (loan.id === id) {
                return res.status(200).send({
                    status: "200",
                    message: "loan retrieved successfully",
                    data: loan,
                });
            }
            return res.status(404).send({
                status: "404",
                error: "Loan does not exist"
            });
        });
    }
}
export default LoanController;