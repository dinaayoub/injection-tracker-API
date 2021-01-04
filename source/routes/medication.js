'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middleware/bearer');
const dataModel = require('../mongo/data-model');
const medicationSchema = require('../mongo/medicationSchema');
const medications = new dataModel(medicationSchema);

router.get('/medication', bearerAuth, getMedications);
router.get('/medication/:id', bearerAuth, getMedication);
router.post('/medication', bearerAuth, postMedication);
router.put('/medication/:id', bearerAuth, putMedication);
router.delete('/medication/:id', bearerAuth, deleteMedication);

//TODO: Need to secure this so having the ID alone is not enough 
// Need to authorize and place their user ID in request so we don't take 
// user ID from req.body, but from the bearer auth token. 

async function getMedications(req, res) {
    console.log(req.user._id);
    res.status(200).json(await medications.get(req.user._id));
}

async function getMedication(req, res) {
    res.status(200).json(await medications.get(req.user._id, req.params.id));
}

async function postMedication(req, res) {
    
    res.status(200).json(await medications.post(req.body, req.user._id));
}

async function putMedication(req, res) {
    res.status(200).json(await medications.put(req.params.id, req.body, req.user._id));
}

async function deleteMedication(req, res) {
    res.status(200).json(await medications.delete(req.params.id, req.user._id));
}

module.exports = router;