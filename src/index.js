const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/connection.js');
const router = require('./routes');
const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is runnig on port 3000');
});

app.use(router);
