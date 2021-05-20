const knex = require('../../../db');

const getAllIncidents = async () => {
  const results = await knex('incident');
  return results;
};

const getIncidentById = async (id) => {
  const result = await knex('incident').where({ id });

  return result;
};

const registerIncident = async (description, fk_severity, fk_project) => {
  const result = await knex('incident').insert({ description, fk_severity, fk_project });

  return result;
};

const updateIncident = async (id, description) => {
  try {
    const result = await knex('incident').update({ description }).where({ id });
    return { result };
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

const deleteIncident = async (id) => {
  try {
    const result = await knex('incident').where({ id }).delete();
    return { result };
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

module.exports = { getAllIncidents, getIncidentById, registerIncident, updateIncident, deleteIncident };
