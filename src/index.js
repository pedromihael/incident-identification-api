const express = require('express');
const cors = require('cors');
const db = require('./db/connection.js');

const app = express();

app.disable('x-powered-by');
app.use(cors());

app.listen(3000, () => {
  console.log('Server is runnig on port 3000');
});

app.get('/', (req, res) => {
  res.send('Server is awake');
});
