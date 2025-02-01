import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import redisClint from "../services/redis.service.js";

export const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).send({ error: 'unauthorize user' });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const isBlacklisted = await redisClint.get(token);

        if (isBlacklisted) {
            res.cookie('token', '');
            return res.send({ error: 'unauthorize user' });
        }
        const user = await userModel.findOne({ email: decode.email })
        if (!user) {
            return res.status(401).send({ error: 'unauthorize user' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({ error: 'unauthorize user' });
    }
}