import Loans from '../models/loan';
import Validation from '../helpers/validation';
import Users from '../models/user';

class LoanController {
    static async applyLoan(req, res) {
        const {
            error
        } = Validation.validateApplication(req.body);
        if (error) {
            return res.status(400).json({
                status: 400,
                error: error.details[0].message,
            });
        }

        const findUser = await Users.getSpecificUser(req.body.email);
        if (findUser.length === 0) {
            return res.status(404).send({
                status: 404,
                error: 'User does not exist!',
            });
        }
        const loan = await Loans.checkLoan(req.body.email);
        if (loan.length !== 0) {
            return res.status(409).json({
                status: 409,
                error: 'You already have a pending loan',
            });
        }
        const newLoan = await Loans.applyForLoan(req.body);
        return res.status(201).json({
            status: 201,
            data: newLoan,
        });
    }
    static async getOneLoan(req, res) {
        if (isNaN(req.params.id)) {
            return res.status(400).json({
                status: 400,
                error: 'LOAN ID MUST AND INTEGER',
            });
        }
        const result = await Loans.getOneLoan(req.params.id);
        if (result.length === 0) {
            return res.status(404).json({
                status: 404,
                error: 'NO LOAN FOUND WITH THAT ID'
            });
        }
        return res.status(200).json({
            status: 200,
            data: result,
        });
    }
    static async loanApproval(req, res) {
        if (isNaN(req.params.id)) {
            return res.status(400).send({
                status: 400,
                error: 'Invalid URL, loan id must be an integer',
            });
        }
        const {
            error
        } = Validation.validApproval(req.body);
        if (error) {
            return res.status(400).json({
                status: 400,
                error: error.details[0].message,
            });
        }
        const findLoan = await Loans.getOneLoan(req.params.id);
        if (findLoan.length ===0) {
            return res.status(404).json({
                status: 404,
                error: 'THIS LOAN DOES NOT EXIST IN DATABASE',
            });
        }
        const updateLoan = await Loans.updateLoan(req.params.id, req.body.status);
        return res.status(200).json({
            status: 200,
            message: 'updated loan status',
            data: updateLoan,
        });
    }

    static async getAllLoansByStatus(req,res){
        const allLoans = await Loans.getAllLoans();
        const {status,repaid} = req.query;
        const findLoanStatus = await Loans.getLoanByStatus(status,repaid);
        if(findLoanStatus.length !== 0){
            return res.status(200).json({
                status: 200,
                data: findLoanStatus,
            });
        }else if(!status && !repaid){
            return res.status(200).json({
                status: 200,
                data: allLoans,
            });
        }else{
            return res.status(404).json({
                status: 404,
                error: 'NO LOAN FOUND',
            });
        }

        // if(status=== 'approved' && (repaid === 'true' || repaid === 'false')){
            
        // }
        return res.status(404).json({
            status: 404,
            error: 'NO LOAN FOUND',
        });
    }
}
export default LoanController;