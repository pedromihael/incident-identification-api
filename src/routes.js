const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from kickoff.');
});

router.post('/register', (req, res) => {
  const { project, incident, severity } = req.body;
  res.send('ok');
});

module.exports = router;

/**
 * project: {
 *  name
 * }
 * incident {
 *  project_name
 * }
 * severity {
 *  name
 *  weight
 * }
 */
