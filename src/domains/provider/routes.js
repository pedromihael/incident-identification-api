const express = require('express');
const router = express.Router();

const {
  getProviderById,
  getProviderByName,
  registerProvider,
  getAllProviders,
  updateProvider,
  deleteProvider,
} = require('./controllers');

router.get('/provider', async (req, res) => {
  const response = await getAllProviders();
  res.send(response);
});

router.get('/provider/:id', async (req, res) => {
  const response = await getProviderById(req.params.id);
  res.send(response);
});

router.get('/provider/:name', async (req, res) => {
  const response = await getProviderByName(req.params.name);
  res.send(response);
});

router.post('/provider', async (req, res) => {
  const { name } = req.body;
  const response = await registerProvider(name);
  res.send(response);
});

router.put('/provider', async (req, res) => {
  const { value, field, id } = req.body;
  const response = await updateProvider(id, field, value);

  res.send(response);
});

router.delete('/provider/:id', async (req, res) => {
  const response = await deleteProvider(req.params.id);

  res.send(response);
});

module.exports = router;
