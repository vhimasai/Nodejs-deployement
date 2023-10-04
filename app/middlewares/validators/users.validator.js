import yup from "yup";
import validate from "./validate.js";

const createUser = validate(yup.object({
    body: yup.object({
        name: yup.string().min(3, "Minimum 3 character is required!").required("Name is required Field!"),
        email: yup.string().email('Invalid Email').required("Email is required Field!"),
        contact: yup.number().positive().integer().required("Contact is required Field!"),
        password: yup.string().min(8, "Minimum 8 character is Required!").required("Password is required Field!")
    })
}))

export default { createUser }