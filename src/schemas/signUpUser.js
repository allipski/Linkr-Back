import joi from 'joi'

const userSchema= joi.object({
    email: joi.string().required().max(50),
    password: joi.string().required().min(1),
    username: joi.string().required().min(1).max(50),
    pictureUrl: joi.string().required().uri()
});

export default userSchema;