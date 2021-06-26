const knex = require('../../../db');

const projectsModel = require('../../project/models');
const providerModel = require('../../provider/models');

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

const registerIncident = async (description, fk_severity, fk_project) => {
  try {
    await knex('incident').insert({ description, fk_severity, fk_project });

    const incidentsByProject = await getIncidentsByProject(fk_project);
    await projectsModel.updateReliability(fk_project, fk_severity, incidentsByProject);
    await providerModel.updateReliability(fk_project);

    return { ok: true };
  } catch (error) {
    console.log('error', error);
    return errorFactory.createError(error, 'registerIncident');
  }
};

const updateIncident = async (id, field, value) => {
  try {
    // cada incidente atualizado precisa ter a confiabilidade do projeto e do provedor alteradas

    await knex('incident')
      .update({ [`${field}`]: value })
      .where({ id });

    return { ok: true };
  } catch (error) {
    return errorFactory.createError(error, 'updateIncident');
  }
};

const deleteIncident = async (id) => {
  try {
    // cada incidente deletado precisa ter a confiabilidade do projeto e do provedor alteradas

    await knex('incident').where({ id }).delete();
    return { ok: true };
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
