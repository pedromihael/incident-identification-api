const knex = require('../../../db');
const ApiErrorFactory = require('../../../shared/factories/ApiErrorFactory');

const apiErrorFactory = new ApiErrorFactory();

const getAllProjects = async () => {
  try {
    const results = await knex('project');
    return results;
  } catch (error) {
    return apiErrorFactory.createError(error, 'getAllProjects');
  }
};

const getProjectById = async (id) => {
  try {
    const result = await knex('project').where({ id });
    return result;
  } catch (error) {
    return apiErrorFactory.createError(error, 'getProjectById');
  }
};

const getProjectByName = async (name) => {
  try {
    const result = await knex('project').where({ name });
    return result;
  } catch (error) {
    return apiErrorFactory.createError(error, 'getProjectByName');
  }
};

const registerProject = async (name, responsible, hour_effort, fk_provider) => {
  try {
    await knex('project').insert({ name, responsible, hour_effort, fk_provider });
    return { ok: true };
  } catch (error) {
    return apiErrorFactory.createError(error, 'registerProject');
  }
};

const updateProject = async (id, field, value) => {
  try {
    await knex('project')
      .update({ [`${field}`]: value })
      .where({ id });

    return { ok: true };
  } catch (error) {
    return apiErrorFactory.createError(error, 'updateProject');
  }
};

const updateProjectReliability = async (id, value) => {
  try {
    await knex('project').update({ reliability_percentage: value }).where({ id });
    return { ok: true };
  } catch (error) {
    return apiErrorFactory.createError(error, 'updateProjectReliability');
  }
};

const deleteProject = async (id) => {
  try {
    await knex('project').where({ id }).delete();
    return { ok: true };
  } catch (error) {
    return apiErrorFactory.createError(error, 'deleteProject');
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  getProjectByName,
  registerProject,
  updateProject,
  updateProjectReliability,
  deleteProject,
};
