import express from 'express'
import { createUser, login } from '../controllers/authController.js';
import { validateLogin, validateSignUpInputs } from '../middleware/validateSignInputs.js';


const router = express.Router();

router.post('/signUp',validateSignUpInputs,createUser,login);
router.post('/',validateLogin,login);

export default router;