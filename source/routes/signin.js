'use strict';

const express = require('express');
const router = express.Router();
const authenticate = require('../auth/authenticate');

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', authenticate, signIn);

async function signIn(req,res) {
    res.status(200).send(req.user);
}

module.exports = router;