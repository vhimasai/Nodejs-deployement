import msg from "../../utils/response.js"

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            params: req.params,
            query: req.query
        });
        return next();
    } catch (error) {
        msg.errorMsg(res, 500, error.message)
    }
}

export default validate;