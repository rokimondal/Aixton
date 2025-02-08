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

export const getAllUsers = async ({ userId }) => {
    const users = await userModel.find({
        _id: { $ne: userId }
    });
    console.log(users)
    return users;
}
export const acceptRequest = async ({ projectId, email }) => {
    if (!projectId) {
        throw new Error("Invalid project Id");
    }
    if (!email) {
        throw new Error("User email is required");
    }
    const user = await userModel.findOne({ email });
    if (!user.requests.includes(projectId)) {
        throw new Error("Invalid project Id");
    };
    try {
        user.requests.filter(id => !id.equals(mongoose.Types.ObjectId(projectId)));
        user.projects = [...user.projects, projectId];
        await user.save();
        user.password = undefined;
        return user
    } catch (error) {
        throw error;
    }
}
export const deleteRequest = async ({ projectId, email }) => {
    if (!projectId) {
        throw new Error("Invalid project Id");
    }
    if (!email) {
        throw new Error("User email is required");
    }
    const user = await userModel.findOne({ email });
    if (!user.requests.includes(projectId)) {
        throw new Error("Invalid project Id");
    };
    try {
        user.requests.filter(id => !id.equals(mongoose.Types.ObjectId(projectId)));
        await user.save();
        user.password = undefined;
        return user
    } catch (error) {
        throw error;
    }
}