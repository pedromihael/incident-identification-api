const knex = require('../../../db');

const getAllSeverities = async () => {
  const results = await knex('severity')
    .join('severity_enum', 'fk_severity_enum', 'severity_enum.id')
    .select('severity.id', 'severity.weight', 'severity_enum.name');
  return results;
};

const getSeverityById = async (id) => {
  const result = await knex('severity')
    .join('severity_enum', 'fk_severity_enum', 'severity_enum.id')
    .select('severity.id', 'severity.weight', 'severity_enum.name')
    .where({ 'severity.id': id });

  return result;
};

const getSeverityByName = async (name) => {
  const result = await knex('severity')
    .join('severity_enum', 'fk_severity_enum', 'severity_enum.id')
    .select('severity.id', 'severity.weight', 'severity_enum.name')
    .where({ name });

  return result;
};

const registerSeverity = async (weight, fk_severity_enum, name) => {
  const result1 = await knex('severity_enum').insert({ id: fk_severity_enum, name });
  const result2 = await knex('severity').insert({ weight, fk_severity_enum });

  return [...result1, ...result2];
};

const updateSeverity = async (id, field, value) => {
  try {
    if (field === 'name') {
      const result = await knex('severity_enum').update({ name: value }).where({ id });
      return { result };
    } else {
      const result = await knex('severity')
        .update({ [`${field}`]: value })
        .where({ id });
      return { result };
    }
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

const deleteSeverity = async (id) => {
  try {
    const result1 = await knex('severity').select('fk_severity_enum').where({ id });
    const result2 = await knex('severity').where({ id }).delete();
    const result3 = await knex('severity_enum').where({ id: result2[0]['fk_severity_enum'] }).delete();
    return [...result1, ...result2, ...result3];
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

module.exports = {
  getAllSeverities,
  getSeverityById,
  getSeverityByName,
  registerSeverity,
  updateSeverity,
  deleteSeverity,
};
