const knex = require('../../../db');

const getAllProjects = async () => {
  const results = await knex('project');
  return results;
};

const getProjectById = async (id) => {
  const result = await knex('project').where({ id });

  return result;
};

const getProjectByName = async (name) => {
  const result = await knex('project').where({ name });

  return result;
};

const registerProject = async (name, responsible, reliability_percentage, hour_effort, fk_provider) => {
  const result = await knex('project').insert({ name, responsible, reliability_percentage, hour_effort, fk_provider });

  return result;
};

const updateProject = async (id, field, value) => {
  try {
    const result = await knex('project')
      .update({ [`${field}`]: value })
      .where({ id });
    return { result };
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

const deleteProject = async (id) => {
  try {
    const result = await knex('project').where({ id }).delete();
    return { result };
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

module.exports = { getAllProjects, getProjectById, getProjectByName, registerProject, updateProject, deleteProject };
