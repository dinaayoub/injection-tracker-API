'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middleware/bearer');
const injectionSchema = require('../mongo/injectionSchema');
const dataModel = require('../mongo/data-model');
const injections = new dataModel(injectionSchema);

router.get('/injection', bearerAuth, getInjections);
router.get('/injection/:id', bearerAuth, getInjection);
router.post('/injection', bearerAuth, postInjection);
router.put('/injection/:id', bearerAuth, putInjection);
router.delete('/injection/:id', bearerAuth, deleteInjection);

async function getInjections(req, res) {
    res.status(200).json(await injections.get(req.user._id));
}

async function getInjection(req, res) {
    res.status(200).json(await injections.get(req.user._id,req.params.id));
}

async function postInjection(req, res) {
    res.status(200).json(await injections.post(req.body, req.user._id));
}

async function putInjection(req, res) {
    res.status(200).json(await injections.put(req.params.id, req.body, req.user._id));
}

async function deleteInjection(req, res) {
    res.status(200).json(await injections.delete(req.params.id,req.user._id));
}

module.exports = router;