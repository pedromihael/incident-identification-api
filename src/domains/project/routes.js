const express = require('express');
const router = express.Router();

const {
  getProjectById,
  getProjectsByName,
  registerProject,
  getAllProjects,
  updateProject,
  deleteProject,
} = require('./controllers');

router.get('/project', async (req, res) => {
  const response = await getAllProjects();
  res.send(response);
});

router.get('/project/:id', async (req, res) => {
  const response = await getProjectById(req.params.id);
  res.send(response);
});

router.get('/project/:name', async (req, res) => {
  const response = await getProjectsByName(req.params.name);
  res.send(response);
});

router.post('/project', async (req, res) => {
  const { name, responsible, hours_effort, fk_provider } = req.body;
  const response = await registerProject(name, responsible, hours_effort, fk_provider);
  res.send(response);
});

router.put('/project', async (req, res) => {
  const { value, field, id } = req.body;
  const response = await updateProject(id, field, value);

  res.send(response);
});

router.delete('/project/:id', async (req, res) => {
  const response = await deleteProject(req.params.id);

  res.send(response);
});

module.exports = router;
