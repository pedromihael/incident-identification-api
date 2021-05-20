const knex = require('../../../db');

const getAllReliabilities = async () => {
  const results = await knex('reliability');
  return results;
};

const getReliabilityById = async (id) => {
  const result = await knex('reliability').where({ id });

  return result;
};

const getReliabilityByName = async (name) => {
  const result = await knex('reliability').where({ name });

  return result;
};

const registerReliability = async (name, meta_percent) => {
  const result = await knex('reliability').insert({ name, meta_percent });

  return result;
};

const updateReliability = async (id, field, value) => {
  try {
    const result = await knex('reliability')
      .update({ [`${field}`]: value })
      .where({ id });
    return { result };
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

const deleteReliability = async (id) => {
  try {
    const result = await knex('reliability').where({ id }).delete();
    return { result };
  } catch (err) {
    console.log('err', err);
    return err;
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
