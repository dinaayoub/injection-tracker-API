'use strict';

function notFoundError(error, req, res, next) {
    console.error(error);
    const errorObject = {
        statusCode: 404,
        message: 'Resource Not Found - ' + (error.message ? error.message : error)
    }
    res.status(404).json(errorObject);
}

module.exports = notFoundError;