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