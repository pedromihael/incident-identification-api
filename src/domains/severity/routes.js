const express = require('express');
const router = express.Router();

const {
  getSeverityById,
  getSeverityByName,
  registerSeverity,
  getAllSeverities,
  updateSeverity,
  deleteSeverity,
} = require('./controllers');

router.get('/severity', async (req, res) => {
  const response = await getAllSeverities();
  res.send(response);
});

router.get('/severity/:id', async (req, res) => {
  const response = await getSeverityById(req.params.id);
  res.send(response);
});

router.get('/severity/:name', async (req, res) => {
  const response = await getSeverityByName(req.params.name);
  res.send(response);
});

router.post('/severity', async (req, res) => {
  const { weight, fk_severity_enum, fk_project } = req.body;
  const response = await registerSeverity(weight, fk_severity_enum, fk_project);
  res.send(response);
});

router.put('/severity', async (req, res) => {
  const { value, field, id } = req.body;
  const response = await updateSeverity(id, field, value);

  res.send(response);
});

// do not delete severities

// router.delete('/severity/:id', async (req, res) => {
//   const response = await deleteSeverity(req.params.id);

//   res.send(response);
// });

module.exports = router;
