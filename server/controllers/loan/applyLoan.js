import loanDb from '../../models/loanDb';
import Joi from 'joi';
import moment from 'moment';

class ApplyLoan{
    async loanApply(req, res) {
        const schema = {
            email: Joi.string().email().required(),
            tenor: Joi.number().integer().positive().max(12).required(),
            amount:Joi.number().precision(2).required(),
        };
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).json(result.error.details[0].message);
        }
        const {email,tenor,amount} = req.body;
        const id = loanDb.length + 1;
      const interest = 0.05 * parseInt(amount, 10).toFixed(2);
        const paymentInstallment = (parseInt(amount,10) + parseInt(interest,10)).toFixed(2)/parseInt(tenor,10).toFixed(2); 
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
            createdOn:moment(new Date()).format('YYYY-MM-DD HH:MM:SS'),
        };
        if(loanDb.find(user => user.email === email)){
            return res.status(409).send({
                status: 409,
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
}
const applyLoan = new ApplyLoan();
export default applyLoan;