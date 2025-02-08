import mongoose from 'mongoose';
import projectModel from '../models/project.model.js'
import userModel from '../models/user.model.js'

export const createProject = async ({ name, userId }) => {
    if (!name) {

        throw new Error("name is required");
    }
    if (!userId) {
        throw new Error("userId is required");
    }

    try {
        const existingProject = await projectModel.findOne({ name, createdBy: userId });
        if (existingProject) {
            throw new Error("Project name already exists");
        }
        const project = await projectModel.create({
            name,
            createdBy: userId,
            users: [userId],
        })
        const user = await userModel.findById(userId);
        user.projects = [...user.projects, project._id];
        await user.save();
        return project;
    } catch (error) {
        throw error;
    }
}

export const sendRequest = async ({ projectId, userIds, userId }) => {
    if (!projectId) {
        throw new Error("Project Id required");
    }
    if (!userIds) {
        throw new Error("User Ids required");
    }
    if (!Array.isArray(userIds) || !userIds.every(userId => mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid user Id in users array");
    }
    if (!userId) {
        throw new Error("User Id required");
    }
    try {

        let project = await projectModel.findById(projectId);
        if (!project) {
            throw new Error("Invalid project Id");
        }
        if (!project.createdBy.equals(new mongoose.Types.ObjectId(userId))) {
            throw new Error("User can't add members");
        }
        project.users = [...project.users, ...userIds];
        await project.save();
        const result = await userModel.updateMany({ _id: { $in: userIds } }, {
            $addToSet: {
                projects: projectId
            }
        });

        return project;
    } catch (error) {
        throw error
    }
}