const response = ({ req, res, code, message, data }) => {
    return res.status(code).json({
        code,
        message,
        data
    });
}

module.exports = { response }