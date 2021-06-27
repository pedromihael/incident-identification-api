const knex = require('../../../db');
const ApiErrorFactory = require('../../../shared/factories/ApiErrorFactory');

const apiErrorFactory = new ApiErrorFactory();

const getAllSeverities = async () => {
  try {
    const results = await knex('severity')
      .join('severity_enum', 'fk_severity_enum', 'severity_enum.id')
      .select('severity.id', 'severity.weight', 'severity_enum.name')
      .orderBy('severity.id');
    return results;
  } catch (error) {
    return apiErrorFactory.createError(error, 'getAllSeverities');
  }
};

const getSeverityById = async (id) => {
  try {
    const result = await knex('severity')
      .join('severity_enum', 'fk_severity_enum', 'severity_enum.id')
      .select('severity.id', 'severity.weight', 'severity_enum.name')
      .where({ 'severity.id': id });
    return result[0];
  } catch (error) {
    return apiErrorFactory.createError(error, 'getSeverityById');
  }
};

const getSeverityByWeight = async (weight) => {
  try {
    const result = await knex('severity')
      .join('severity_enum', 'fk_severity_enum', 'severity_enum.id')
      .select('severity.id', 'severity.weight', 'severity_enum.name')
      .where({ 'severity.weight': weight });
    return result[0];
  } catch (error) {
    return apiErrorFactory.createError(error, 'getSeverityByWeight');
  }
};

const getSeverityByName = async (name) => {
  try {
    const result = await knex('severity')
      .join('severity_enum', 'fk_severity_enum', 'severity_enum.id')
      .select('severity.id', 'severity.weight', 'severity_enum.name')
      .where({ name });
    return result[0];
  } catch (error) {
    return apiErrorFactory.createError(error, 'getSeverityByName');
  }
};

const registerSeverity = async (weight, fk_severity_enum, name) => {
  try {
    await knex('severity_enum').insert({ id: fk_severity_enum, name });
    await knex('severity').insert({ weight, fk_severity_enum });

    return { ok: true };
  } catch (error) {
    return apiErrorFactory.createError(error, 'registerSeverity');
  }
};

const updateSeverity = async (id, field, value) => {
  try {
    if (field === 'name') {
      await knex('severity_enum').update({ name: value }).where({ id });
      return { ok: true };
    } else {
      await knex('severity')
        .update({ [`${field}`]: value })
        .where({ id });
      return { ok: true };
    }
  } catch (error) {
    return apiErrorFactory.createError(error, 'updateSeverity');
  }
};

const deleteSeverity = async (id) => {
  try {
    await knex('severity').select('fk_severity_enum').where({ id });
    const result = await knex('severity').where({ id }).delete();
    await knex('severity_enum').where({ id: result[0]['fk_severity_enum'] }).delete();
    return { ok: true };
  } catch (error) {
    return apiErrorFactory.createError(error, 'deleteSeverity');
  }
};

module.exports = {
  getAllSeverities,
  getSeverityById,
  getSeverityByWeight,
  getSeverityByName,
  registerSeverity,
  updateSeverity,
  deleteSeverity,
};
