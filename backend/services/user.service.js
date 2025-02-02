import userModel from "../models/user.model.js"

export const createUser = async ({ email, name, password }) => {

    if (!email || !name || !password) {
        throw new Error("email, name and password required");
    }
    try {

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userModel.create({
            email,
            name,
            password: hashedPassword,
        })
        return user;
    } catch (error) {
        throw error;
    }
}