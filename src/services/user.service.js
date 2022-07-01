const httpStatus =  require('http-status');
const ApiError =    require('../utils/ApiError');
const { User } =    require('../models');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const createUser = async (userBody) => {
    User.create(userBody).then(data => {
        return(data)
    }).catch(err => {
        return(err)
    });
};

module.exports = {
    createUser
};