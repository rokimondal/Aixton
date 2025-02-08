import { Router } from 'express'
import * as userController from '../controllers/user.controller.js'
import { body, param } from 'express-validator'
import * as authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('name').isLength(3).withMessage('name must be at least 3 character'),
    body('password').isLength(6).withMessage('password must be at least 6 characters'),
    userController.createUserController
);

router.post('/login',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength(6).withMessage('password must be at least 6 characters'),
    userController.loginController
);

router.get('/profile', authMiddleware.userAuth, userController.profileController);

router.get('/logout', authMiddleware.userAuth, userController.logoutController);

router.get('/all',
    authMiddleware.userAuth,
    userController.allUserController
);
router.put('/accept-request',
    authMiddleware.userAuth,
    body('projectId').isMongoId().withMessage("Invalid Project Id"),
    userController.acceptRequest
)
router.delete('/delete-request',
    authMiddleware.userAuth,
    body('projectId').isMongoId().withMessage("Invalid Project Id"),
    userController.deleteRequest
)

export default router;