'use strict';

function invalidLogin(error, req, res, next) {
    console.error(error);
    const errorObject = {
        statusCode: 403,
        message: 'Login error - ' + (error.message ? error.message : error)
    }
    res.status(403).json(errorObject);
}

module.exports = invalidLogin;