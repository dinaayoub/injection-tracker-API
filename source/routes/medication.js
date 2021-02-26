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

//TODO: Need to secure this so having the ID alone is not enough, 
//the record's  user id must match the user id from bearer auth (req.user_id)

async function getMedications(req, res) {
  // console.log(req.user_id);
  res.status(200).json(await medications.get(req.user_id));
}

async function getMedication(req, res) {
  let record = await medications.get(req.user_id, req.params.id);
  // console.log(`record`, record);
  if (record.length) {
    // console.log('why am i in here?', record);
    res.status(200).json(record);
  }
  else
    res.status(403).send('Could not get item. Item doesn\'t exist or access is denied.');
}

async function postMedication(req, res) {
  res.status(200).json(await medications.post({ ...req.body, user_id: req.user_id }));
}

async function putMedication(req, res) {
  let record = await medications.put(req.params.id, { ...req.body, user_id: req.user_id });
  if (record)
    res.status(200).json(record);
  else
    res.status(403).send('Could not update item. Item doesn\'t exist or access is denied.');
}

async function deleteMedication(req, res) {
  let record = await medications.delete(req.params.id, req.user_id);
  if (record)
    res.status(200).json(record);
  else
    res.status(403).send('Could not delete item. Item doesn\'t exist or access is denied.');
}

module.exports = router;