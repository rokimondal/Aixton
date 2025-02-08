import userModel from '../models/user.model.js'
import * as projectService from '../services/project.service.js'
import { validationResult } from "express-validator"

export const createProject = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
    }
    try {
        const { name } = req.body;
        const newProject = await projectService.createProject({ name, userId: req.user._id });

        res.status(200).json(newProject);
    } catch (error) {

        res.status(400).send(error.message)
    }
}

export const getAllProjects = async (req, res) => {
    try {
        console.log("before")
        await req.user.populate('projects');
        const projects = req.user.projects;
        console.log(req.user);
        res.json({ projects })
    } catch (error) {
        res.send(error);
    }
}

export const sendRequests = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
    }
    try {
        const projectId = req.body.projectId;
        const userIds = req.body.users;
        const userId = req.user._id;
        const updatedProject = await projectService.sendRequest({ projectId, userIds, userId })
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(400).send(error.message);
    }
}