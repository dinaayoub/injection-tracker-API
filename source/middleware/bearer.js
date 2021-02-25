'use strict';

const users = require('../mongo/userSchema');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login'); }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateWithToken(token);
    // console.log(validUser);
    // req.user = validUser;
    req.user_id = String(validUser._id);
    req.token = validUser.token;
    next();

  } catch (error) {
    res.status(403).send('Invalid Login');
  }
};
