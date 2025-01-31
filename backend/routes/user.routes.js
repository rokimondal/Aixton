import { Router } from 'express'
import * as userController from '../controllers/user.controller.js'
import { body } from 'express-validator'

const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('name').isLength(3).withMessage('name must be at least 3 character'),
    body('password').isLength(6).withMessage('password must be at least 6 characters'),
    userController.createUserController);

export default router;