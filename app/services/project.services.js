import db from "../models/index.js";
import msg from "../utils/response.js";
const Project = db.project
const Users = db.users

const _createProject = async (req, res) => {
    try {
        const { userId, title } = req.body;
        const user = await Users.findByPk(userId);
        const project = await Project.create({ title });
        await user.addProject(project);
        return msg.successMsg(res, 200, project, "Project added successfully...");

    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}

const _addProjectToUser = async (req, res) => {
    try {
        const { userId, projectId } = req.body;
        const user = await Users.findByPk(userId);
        const data = await Project.findByPk(projectId);
        const userProject = await user.addProject(data);
        return msg.successMsg(res, 200, userProject, "Project added to User successfully...");

    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}


const _getAllProjects = async (req, res) => {
    try {
        const allProject = await Project.findAll({ include: [Users] });

        return msg.successMsg(res, 201, allProject, "All project returned successfully...")
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}

const _getProjectByPk = async (req, res) => {
    const { projectId } = req.params;
    try {
        const data = await Project.findByPk(projectId, { include: [Users] });

        return msg.successMsg(res, 201, data, "Project returned successfully...")
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}

const _getUserProjectsById = async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await Users.findByPk(userId, { include: [Project] });

        return msg.successMsg(res, 201, data, "User returned successfully...")
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}


export default { _createProject, _addProjectToUser, _getAllProjects, _getProjectByPk, _getUserProjectsById }