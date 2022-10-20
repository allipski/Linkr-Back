import joi from 'joi'

const loginShema = joi.object({
    email:joi.string().required().max(50),
    password: joi.string().required().min(1)
});

export default loginShema;