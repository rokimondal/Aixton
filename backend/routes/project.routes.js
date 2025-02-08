import { Router } from "express";
import { body } from 'express-validator'
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as projectController from '../controllers/project.controller.js'

const router = Router();

router.post('/create',
    body('name').isString().withMessage("Name is required"),
    authMiddleware.userAuth,
    projectController.createProject
)

router.get('/all',
    authMiddleware.userAuth,
    projectController.getAllProjects
)

router.put('/send-request',
    authMiddleware.userAuth,
    body('projectId').isString().withMessage("Project Id required"),
    body('users').isArray({ min: 1 }).withMessage("users must contain at least one element"),
    body('users.*').isMongoId().withMessage("user must contain user Ids"),
    projectController.sendRequests
)

export default router;