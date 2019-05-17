import Joi from 'joi';

class Validate {
  static  signupValidation(validUser) {
        const schema = {
            firstname: Joi.string().min(3).max(25).required().strict().trim().label('First name is required'),
            lastname: Joi.string().min(3).max(20).required().strict().trim().label('Last name is required'),
            gender: Joi.string().valid("Male", "Female").min(3).max(10).required().strict().trim().label('Gender is Only Female or Male'),
            address: Joi.string().min(3).max(25).required().strict().trim().label("'Address can't be empty"),
            email: Joi.string().email().required().strict().trim().label('Email address has to filled'),
            password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required().strict().trim().label('Password has to be filled'),
        };
        return Joi.validate(validUser, schema);
    }

   static applyValidation(validAppl) {
        const schema = {
            email: Joi.string().email().strict().trim().required(),
            tenor: Joi.number().integer().positive().max(12).required(),
            amount: Joi.number().precision(2).required(),
        };
        return Joi.validate(validAppl, schema);
    }
  static  validateLoanStatus(status) {
        const schema = {
            status: Joi.string().valid('approved', 'pending', 'rejected').strict().trim().required(),
        };
        return Joi.validate(status, schema);
    }
  static verifyUser(status) {
        const schema = {
            status: Joi.string().valid('verified', 'unverified').strict().trim().required(),
        };
        return Joi.validate(status, schema);
    }
}
export default Validate;