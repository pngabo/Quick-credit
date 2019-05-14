import Joi from 'joi';

class Validate{
    signupValidation(valiUser){
        const schema = {
            firstname: Joi.string().min(3).max(25).required(),
            lastname: Joi.string().min(3).max(20).required(),
            gender: Joi.string().valid("Male", "Female").min(3).max(10).required(),
            address: Joi.string().min(3).max(25).required(),
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required(),
          };
          return Joi.validate(valiUser,schema);
    }

    applyValidation(validAppl){
        const schema = {
            email: Joi.string().email().required(),
            tenor: Joi.number().integer().positive().max(12).required(),
            amount:Joi.number().precision(2).required(),
        };
        return Joi.validate(validAppl,schema);
    }
}
const validate = new Validate();
export default validate;