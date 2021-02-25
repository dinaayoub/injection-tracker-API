'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middleware/bearer');
const injectionSchema = require('../mongo/injectionSchema');
const medicationSchema = require('../mongo/medicationSchema');
const dataModel = require('../mongo/data-model');
const injections = new dataModel(injectionSchema);
const medications = new dataModel(medicationSchema);

router.get('/injection', bearerAuth, getInjections);
router.get('/injection/:id', bearerAuth, getInjection);
router.post('/injection', bearerAuth, postInjection);
router.put('/injection/:id', bearerAuth, putInjection);
router.delete('/injection/:id', bearerAuth, deleteInjection);

async function getInjections(req, res) {
  res.status(200).json(await injections.get(req.user_id));
}

async function getInjection(req, res) {
  res.status(200).json(await injections.get(req.user_id, req.params.id));

}

async function postInjection(req, res) {
  let medication = await medications.get(req.user_id, req.body.medication_id);
  // console.log('MEDICATION = ', medication);
  if (medication) {
    res.status(200).json(await injections.post({ ...req.body, user_id: req.user_id }));
  }
  else
    res.status(403).send('Could not add item. The chosen medication does not exist or access is denied.');

}

async function putInjection(req, res) {
  let medication = await medications.get(req.user_id, req.body.medication_id);
  // TODO: need to check whether the medication ID they're posting is correct for that user id
  if (medication) {
    res.status(200).json(await injections.put(req.params.id, { ...req.body, user_id: req.user_id }));
  }
  else
    res.status(403).send('Could not add item. The chosen medication does not exist or access is denied.');

}

async function deleteInjection(req, res) {
  res.status(200).json(await injections.delete(req.params.id, req.user_id));
}

module.exports = router;