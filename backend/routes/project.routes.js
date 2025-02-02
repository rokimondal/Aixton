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

export default router;