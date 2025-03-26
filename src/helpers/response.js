const response = ({ req, res, code, message, data }) => {
    return res.json({
        req,
        res,
        code,
        message,
        data
    });
}

module.exports = { response }