const  logger  = require('../../helpers/logger');
const { Users } = require('../../models/Users');

const signinSequelizer = async ({ where }) => {
    try {
        const user = await Users.findOne({
            where: where
        });
        // console.log(user,"-------------------------------------------")
        if (!user) {
            logger.error('User not found');
            return { code: 404, message: 'User not found', data: null };
        }
        logger.info(`User found`);
        return { code: 200, message: 'User found', data: user };
    } catch (err) {
        logger.error('Error during sign-in', err);
        return { code: 500, message: 'Internal server error', data: null };
    }
};

module.exports = { signinSequelizer };

