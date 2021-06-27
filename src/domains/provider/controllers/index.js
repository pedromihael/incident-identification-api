const knex = require('../../../db');
const ApiErrorFactory = require('../../../shared/factories/ApiErrorFactory');

const apiErrorFactory = new ApiErrorFactory();

const getAllProviders = async () => {
  try {
    const results = await knex('provider').orderBy('id');
    return results;
  } catch (error) {
    return apiErrorFactory.createError(error, 'getAllProviders');
  }
};

const getProviderById = async (id) => {
  try {
    const result = await knex('provider').where({ id });
    return result[0];
  } catch (error) {
    return apiErrorFactory.createError(error, 'getProviderById');
  }
};

const getProviderByName = async (name) => {
  try {
    const result = await knex('provider').where({ name });
    return result[0];
  } catch (error) {
    return apiErrorFactory.createError(error, 'getProviderByName');
  }
};

const registerProvider = async (name) => {
  try {
    await knex('provider').insert({ name });
    return { ok: true };
  } catch (error) {
    return apiErrorFactory.createError(error, 'registerProvider');
  }
};

const updateProvider = async (id, field, value) => {
  try {
    await knex('provider')
      .update({ [`${field}`]: value })
      .where({ id });

    return { ok: true };
  } catch (error) {
    return apiErrorFactory.createError(error, 'updateProvider');
  }
};

const updateProviderReliability = async (id, value) => {
  try {
    await knex('provider').update({ reliability_percentage: value }).where({ id });
    return { ok: true };
  } catch (error) {
    return apiErrorFactory.createError(error, 'updateProviderReliability');
  }
};

const deleteProvider = async (id) => {
  try {
    await knex('provider').where({ id }).delete();
    return { ok: true };
  } catch (error) {
    return apiErrorFactory.createError(error, 'deleteProvider');
  }
};

module.exports = {
  getAllProviders,
  getProviderById,
  getProviderByName,
  registerProvider,
  updateProvider,
  updateProviderReliability,
  deleteProvider,
};
