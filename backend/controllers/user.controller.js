import userModel from '../models/user.model.js'
import { validationResult } from 'express-validator'
import * as userService from '../services/user.service.js'

export const createUserController = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    try {
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT();

        return res.status(201).json({ user, token: token });
    } catch (error) {
        return res.status(400).send(error.message);
    }
}