import Joi from 'joi';

class Validation {
    // VALIDATE USER
    static validateUser(validUser) {
        const schema = {
            firstname: Joi.string().alphanum().strict().trim().required(),
            lastname: Joi.string().alphanum().strict().trim().required(),
            gender: Joi.string().alphanum().strict().trim().required(),
            address: Joi.string().strict().trim().required(),
            phonenumber: Joi.string().strict().trim().required(),
            occupation: Joi.string().alphanum().strict().trim().required(),
            email: Joi.string().email().strict().trim().required(),
            password: Joi.string().strict().trim().required(),
            isadmin: Joi.boolean().required()
        };
        return Joi.validate(validUser, schema, {
            abortEarly: false
        });
    }

    static validLogin(validUser) {
        const schema = {
            email: Joi.string().email().strict().trim().required(),
            password: Joi.string().min(5).max(255).strict().trim().required(),
        };
        return Joi.validate(validUser, schema, {
            abortEarly: false
        });
    }
    static validUserVerification(validStatus) {
        const schema = {
            status: Joi.string().alphanum().valid('verified', 'unverified').strict().trim().required(),
        };
        return Joi.validate(validStatus, schema, {
            abortEarly: false
        });
    }
    // VALIDATE LOAN APPLICATION
    static validateApplication(validApp) {
        const schema = {
            email: Joi.string().email().strict().trim().required(),
            tenor: Joi.number().integer().positive().required(),
            amount: Joi.number().positive().required(),
        };
        return Joi.validate(validApp, schema, {
            abortEarly: false
        });
    }
    static validApproval(validStatus) {
        const schema = {
            status: Joi.string().alphanum().valid('approved', 'rejected').strict().trim().required(),
        };
        return Joi.validate(validStatus, schema, {
            abortEarly: false
        });
    }
    // VALIDATE LOAN REPAYMENT
    static validPaidamount(validAmount) {
        const schema = {
            paidamount: Joi.number().positive().required(),
        };
        return Joi.validate(validAmount, schema, {
            abortEarly: false
        });
    }
}
export default Validation;