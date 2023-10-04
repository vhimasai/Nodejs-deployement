import * as dotenv from "dotenv";
import msg from "../../utils/response.js";
import jwt from "jsonwebtoken";
dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        if (!req.headers || !req.headers['authorization']) {
            return msg.errorMsg(res, 404, "No authorization header")
        }

        const token = req.headers["authorization"].split(' ')[1];
        const user = jwt.verify(token, process.env.ACCESS_KEY);

        req.user = user;

        next();
    } catch (error) {
        console.log(error)
        return msg.errorMsg(res, 401, "Token expired or Incorrect")
    }
}

export default authMiddleware;