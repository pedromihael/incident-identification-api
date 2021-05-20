const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from home.');
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
