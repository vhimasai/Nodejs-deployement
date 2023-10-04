import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import msg from "../utils/response.js"
dotenv.config();
const User = db.users
const Project = db.project

const _createUser = async (req, res) => {
    try {
        const user = req.body;

        const existingUser = await User.findOne({ where: { email: user.email } });
        if (existingUser) return msg.errorMsg(res, 409, "Email already Exist..");

        const hashPassword = bcrypt.hashSync(user.password, 10);
        user.password = hashPassword;

        const createdUser = await User.create(user);
        delete createdUser.dataValues.password;

        return msg.successMsg(res, 201, createdUser, "User created successfully...")
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}

const _loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return msg.errorMsg(res, 401, "Invalid Email or Password");
        }
        delete user.dataValues.password;

        // generate token
        let accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_KEY, { expiresIn: '1d' });
        user.setDataValue("token", accessToken);

        return msg.successMsg(res, 201, user, "User loggedin successfully...")
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}

const _getAllUsers = async (req, res) => {
    try {
        if (req.user) console.log("User:", req.user);
        
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        return msg.successMsg(res, 200, users, "Users returned successfully!")

    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}

const _getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

        if (user) {
            return msg.successMsg(res, 200, user, "User return successfully...")
        } else {
            return msg.errorMsg(res, 404, "User not found..");
        }
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}

const _getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ where: { email }, attributes: { exclude: ['password'] }, include: [Project]});

        if (user) {
            return msg.successMsg(res, 200, user, "User return successfully...")
        } else {
            return msg.errorMsg(res, 404, "User not found..");
        }
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}


const _updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, contact } = req.body;

        // const user = await User.findByPk(id);
        // if (!user) return msg.errorMsg(res, 404, "User not found..");

        const updatedData = await User.update({ name, email, contact }, { where: { id } })
        console.log(updatedData);
        if (updatedData === 1) {
            return msg.successMsg(res, 200, { id, name, email, contact }, "User updated successfully...");
        } else {
            return msg.errorMsg(res, 409, "No changes made to the record, ID=" + id)
        }
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}

const _deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.destroy({ where: { id } });
        if (data === 1) {
            return msg.successMsg(res, 200, data, "User deleted successfully...")
        } else {
            return msg.errorMsg(res, 403, "Invalid User ID")
        }
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}

export default { _createUser, _loginUser, _getAllUsers, _getUserById, _getUserByEmail, _updateUser, _deleteUser }