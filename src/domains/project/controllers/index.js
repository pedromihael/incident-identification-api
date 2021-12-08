const knex = require('../../../db');
const ApiErrorFactory = require('../../../shared/factories/ApiErrorFactory');

const apiErrorFactory = new ApiErrorFactory();

const getAllProjects = async () => {
  try {
    const results = await knex('project')
      .join('provider', 'provider.id', 'project.fk_provider')
      .select(
        'provider.name AS provider',
        'provider.id AS provider_id',
        'provider.reliability_percentage AS provider_reliability.percentage',
        'project.name',
        'project.id',
        'project.reliability_percentage',
        'project.hours_effort',
        'project.fk_provider',
        'project.responsible',
      )
      .orderBy('project.id');
    return results;
  } catch (error) {
    return apiErrorFactory.createError(error, 'getAllProjects');
  }
};

const getProjectById = async (id) => {
  try {
    const result = await knex('project').where({ id });
    return result[0];
  } catch (error) {
    return apiErrorFactory.createError(error, 'getProjectById');
  }
};

const getProjectsByName = async (name) => {
  try {
    const result = await knex('project').where({ name });
    return result[0];
  } catch (error) {
    return apiErrorFactory.createError(error, 'getProjectByName');
  }
};

const getProjectsByProvider = async (fk_provider) => {
  try {
    const result = await knex('project').where({ fk_provider }).orderBy('id');
    return result;
  } catch (error) {
    return apiErrorFactory.createError(error, 'getProjectByProvider');
  }
};

const registerProject = async (name, responsible, hours_effort, fk_provider) => {
  try {
    console.log(name, responsible, hours_effort, fk_provider);
    await knex('project').insert({ name, responsible, hours_effort, fk_provider });
    return { ok: true };
  } catch (error) {
    console.log('error', error);
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
    const results = await knex('project').update({ reliability_percentage: value }).where({ id }).returning('*');
    return { ok: true, results };
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
  getProjectsByName,
  getProjectsByProvider,
  registerProject,
  updateProject,
  updateProjectReliability,
  deleteProject,
};
