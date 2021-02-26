'use strict';

const base64 = require('base-64');
const User = require('../mongo/userSchema');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) {
    res.status(403).send('No Login Info Provided');
    //return _authError(); 
  }

  try {
    let basic = req.headers.authorization.split(' ').pop();
    let [username, password] = base64.decode(basic).split(':');

    req.user = await User.authenticateBasic(username, password);
    next();
  } catch (error) {
    res.status(403).send('Invalid Login');
  }

}

