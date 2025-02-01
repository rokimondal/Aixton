import userModel from '../models/user.model.js'
import { validationResult } from 'express-validator'
import * as userService from '../services/user.service.js'
import redisClint from '../services/redis.service.js'

export const createUserController = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    try {
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT();
        user.password = undefined;
        return res.status(201).json({ user, token: token });
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

export const loginController = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ error: 'invalid credentials' });
        }

        const matchUser = await user.isValidPassword(password);

        if (!matchUser) {
            res.status(401).json({ error: 'invalid credentials' });
        }

        const token = await user.generateJWT();
        user.password = undefined;
        return res.status(200).json({ user, token });
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

export const profileController = async (req, res) => {
    res.status(200).json({ user: req.user })
}

export const logoutController = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    console.log(token);

    redisClint.set(token, 'logout', 'EX', 60 * 60 * 24);
    res.cookie('token', '');
    res.status(200).send('logout successfully');
}