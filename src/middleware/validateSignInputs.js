import loginShema from "../schemas/login.js";
import userSchema from "../schemas/signUpUser.js";

 function validateSignUpInputs(req,res,next){
    
    const newUser = req.body;
    const joiValidation = userSchema.validate(newUser,{abortEarly: false});

    if(joiValidation.error){
        const errorMessage = joiValidation.error.details.map(detail => detail.message);
        return res.status(422).send(errorMessage);
    }
        
    next();
}

 function validateLogin(req,res,next){
    const login = req.body;

    const joiValidation = loginShema.validate(login,{abortEarly: false});

    if(joiValidation.error){
        const errorMessage = joiValidation.error.details.map(detail => detail.message);
        return res.status(422).send(errorMessage);
    }
    next();
}

export {validateSignUpInputs,validateLogin}

