const express = require('express');
const cors = require('cors');
const incidentRouter = require('./domains/incident/routes');
const projectRouter = require('./domains/project/routes');
const providerRouter = require('./domains/provider/routes');
const severityRouter = require('./domains/severity/routes');
const reliabilityRouter = require('./domains/reliability/routes');
const app = express();

app.use(cors());
app.disable('x-powered-by');
app.use(express.json());

app.listen(3003, () => {
  console.log('Server is runnig on port 3003');
});

app.use(incidentRouter);
app.use(projectRouter);
app.use(providerRouter);
app.use(severityRouter);
app.use(reliabilityRouter);
