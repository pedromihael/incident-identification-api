const knex = require('../../../db');
const ApiErrorFactory = require('../../../shared/factories/ApiErrorFactory');

const apiErrorFactory = new ApiErrorFactory();

const getAllReliabilities = async () => {
  try {
    const results = await knex('reliability').orderBy('id');
    return results;
  } catch (error) {
    return apiErrorFactory.createError(error, 'getAllReliabilities');
  }
};

const getReliabilityById = async (id) => {
  try {
    const result = await knex('reliability').where({ id });
    return result[0];
  } catch (error) {
    return apiErrorFactory.createError(error, 'getReliabilityById');
  }
};

const getReliabilityByName = async (name) => {
  try {
    const result = await knex('reliability').where({ name });
    return result[0];
  } catch (error) {
    return apiErrorFactory.createError(error, 'getReliabilityByName');
  }
};

const registerReliability = async (name, meta_percent) => {
  try {
    await knex('reliability').insert({ name, meta_percent });
    return { ok: true };
  } catch (error) {
    console.log('error', error);
    return apiErrorFactory.createError(error, 'registerReliability');
  }
};

const updateReliability = async (id, field, value) => {
  try {
    await knex('reliability')
      .update({ [`${field}`]: value })
      .where({ id });
    return { ok: true };
  } catch (error) {
    return apiErrorFactory.createError(error, 'updateReliability');
  }
};

const deleteReliability = async (id) => {
  try {
    await knex('reliability').where({ id }).delete();
    return { ok: true };
  } catch (error) {
    return apiErrorFactory.createError(error, 'deleteReliability');
  }
};

module.exports = {
  getAllReliabilities,
  getReliabilityById,
  getReliabilityByName,
  registerReliability,
  updateReliability,
  deleteReliability,
};
