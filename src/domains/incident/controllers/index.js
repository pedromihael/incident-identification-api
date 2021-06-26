const knex = require('../../../db');

const providersController = require('../../provider/controllers');
const projectsController = require('../../project/controllers');

const ApiErrorFactory = require('../../../shared/factories/ApiErrorFactory');
const errorFactory = new ApiErrorFactory();

const getAllIncidents = async () => {
  try {
    const results = await knex('incident');
    return results;
  } catch (error) {
    return errorFactory.createError(error, 'getAllIncidents');
  }
};

const getIncidentById = async (id) => {
  try {
    const result = await knex('incident').where({ id });
    return result;
  } catch (error) {
    return errorFactory.createError(error, 'getIncidentById');
  }
};

const getIncidentsByProject = async (fk_project) => {
  try {
    const result = await knex('incident').where({ fk_project });
    return result;
  } catch (error) {
    return errorFactory.createError(error, 'getIncidentsByProject');
  }
};

const registerIncident = async (description, fk_severity, fk_project, fk_provider) => {
  try {
    const result = await knex('incident').insert({ description, fk_severity, fk_project });
    // TODO: mudar confiabilidade

    const newProjectReliability = null; // pegar do model
    const newProviderReliability = null; // pegar do model

    await projectsController.updateProvider(fk_project, 'reliability_percentage', newProjectReliability);
    await providersController.updateProvider(fk_provider, 'reliability_percentage', newProviderReliability);

    return result;
  } catch (error) {
    return errorFactory.createError(error, 'registerIncident');
  }
};

const updateIncident = async (id, description) => {
  try {
    const result = await knex('incident').update({ description }).where({ id });
    return { result };
  } catch (error) {
    return errorFactory.createError(error, 'updateIncident');
  }
};

const deleteIncident = async (id) => {
  try {
    const result = await knex('incident').where({ id }).delete();
    return { result };
  } catch (error) {
    return errorFactory.createError(error, 'deleteIncident');
  }
};

module.exports = {
  getAllIncidents,
  getIncidentById,
  getIncidentsByProject,
  registerIncident,
  updateIncident,
  deleteIncident,
};
