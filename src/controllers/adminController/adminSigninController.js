const logger  = require('../../helpers/logger');
const { adminSigninSequelizer } = require('../../sequelizeController/adminSequelizer/adminSigninSequelizer');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

const adminSigninController = async (req, res) => {
  const { email, password } = req.body;
  const loggerPrefix = "Sign-in Controller: ";
  try {
    logger.info(`${loggerPrefix}Sign-in request received`);
    const result = await adminSigninSequelizer({where: { vendor_mail: email }});
    logger.info(`result: ${JSON.stringify(result)}`);
    if (result.code !== 200) {
      return res.status(result.code).json({
        message: result.message
      });
    }
    const user = result.data.dataValues;
    if (password !== user.vendor_password) {
      logger.error(`${loggerPrefix}Invalid password`);
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user?.vendor_id, email: user?.vendor_mail },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    logger.info(`${loggerPrefix}Sign-in response sent`);
    return res.header(token).status(200).send({ message: 'User signed in successfully', data: { token } });
  } catch (err) {
    logger.error(`${loggerPrefix} Error during sign-in ${err.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { adminSigninController };
