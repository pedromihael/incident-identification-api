const knex = require('../../../db');

const getAllProviders = async () => {
  const results = await knex('provider');
  return results;
};

const getProviderById = async (id) => {
  const result = await knex('provider').where({ id });

  return result;
};

const getProviderByName = async (name) => {
  const result = await knex('provider').where({ name });

  return result;
};

const registerProvider = async (name, reliability_percentage) => {
  const result = await knex('provider').insert({ name, reliability_percentage });

  return result;
};

const updateProvider = async (id, field, value) => {
  try {
    const result = await knex('provider')
      .update({ [`${field}`]: value })
      .where({ id });
    return { result };
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

const deleteProvider = async (id) => {
  try {
    const result = await knex('provider').where({ id }).delete();
    return { result };
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

module.exports = {
  getAllProviders,
  getProviderById,
  getProviderByName,
  registerProvider,
  updateProvider,
  deleteProvider,
};
