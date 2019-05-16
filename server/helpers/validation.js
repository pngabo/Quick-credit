import Joi from 'joi';

class Validate {
    signupValidation(validUser) {
        const schema = {
            firstname: Joi.string().min(3).max(25).required().trim().label('First name is required'),
            lastname: Joi.string().min(3).max(20).required().trim().label('Last name is required'),
            gender: Joi.string().valid("Male", "Female").min(3).max(10).required().trim().label('Gender is Only Female or Male'),
            address: Joi.string().min(3).max(25).required().trim().label("'Address can't be empty"),
            email: Joi.string().email().required().trim().label('Email address has to filled'),
            password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required().trim().label('Password has to be filled'),
        };
        return Joi.validate(validUser, schema);
    }

    applyValidation(validAppl) {
        const schema = {
            email: Joi.string().email().required(),
            tenor: Joi.number().integer().positive().max(12).required(),
            amount: Joi.number().precision(2).required(),
        };
        return Joi.validate(validAppl, schema);
    }
    validateLoanStatus(status) {
        const schema = {
            status: Joi.string().valid('approved', 'pending', 'rejected').required(),
        };
        return Joi.validate(status, schema);
    }
}
const validate = new Validate();
export default validate;