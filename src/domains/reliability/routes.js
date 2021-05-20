const express = require('express');
const router = express.Router();

const {
  getReliabilityById,
  getReliabilityByName,
  registerReliability,
  getAllReliabilities,
  updateReliability,
  deleteReliability,
} = require('./controllers');

router.get('/reliability', async (req, res) => {
  const response = await getAllReliabilities();
  res.send(response);
});

router.get('/reliability/:id', async (req, res) => {
  const response = await getReliabilityById(req.params.id);
  res.send(response);
});

router.get('/reliability/:name', async (req, res) => {
  const response = await getReliabilityByName(req.params.name);
  res.send(response);
});

router.post('/reliability', async (req, res) => {
  const { name, meta_percent } = req.body;
  const response = await registerReliability(name, meta_percent);
  res.send(response);
});

router.put('/reliability', async (req, res) => {
  const { value, field, id } = req.body;
  const response = await updateReliability(id, field, value);

  res.send(response);
});

router.delete('/reliability/:id', async (req, res) => {
  const response = await deleteReliability(req.params.id);

  res.send(response);
});

module.exports = router;
