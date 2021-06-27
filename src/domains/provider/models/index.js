const projectsController = require('../../project/controllers');
const providersController = require('../controllers');

const updateReliability = async (fk_project) => {
  const project = await projectsController.getProjectById(fk_project);
  const { fk_provider } = project;
  const projectsByProvider = await projectsController.getProjectsByProvider(fk_provider);

  let reliabilitiesAndEfforts = [];

  if (projectsByProvider.length) {
    projectsByProvider.forEach((project) => {
      if (project.reliability_percentage) {
        const { reliability_percentage, hours_effort } = project;
        reliabilitiesAndEfforts.push({ reliability_percentage, hours_effort });
      }
    });
  }

  const reduceReliabilityAndEfforts = () => {
    return reliabilitiesAndEfforts.reduce((prev, curr) => {
      if (prev.hasOwnProperty('reliability_percentage')) {
        return prev.reliability_percentage * prev.hours_effort + curr.reliability_percentage * curr.hours_effort;
      } else {
        return prev + curr.reliability_percentage * curr.hours_effort;
      }
    });
  };

  const multiplyReliabilityAndEfforts = () => {
    return reliabilitiesAndEfforts[0].reliability_percentage * reliabilitiesAndEfforts[0].hours_effort;
  };

  const reduceReliabilityAndEffortsForHoursEffort = () => {
    return reliabilitiesAndEfforts.reduce((prev, curr) => {
      if (prev.hasOwnProperty('hours_effort')) {
        return prev.hours_effort + curr.hours_effort;
      } else {
        return prev + curr.hours_effort;
      }
    });
  };

  const sumOfProductsFromReliabilityAndEffort =
    reliabilitiesAndEfforts.length > 1 ? reduceReliabilityAndEfforts() : multiplyReliabilityAndEfforts();

  const sumOfHoursEffort =
    reliabilitiesAndEfforts.length > 1
      ? reduceReliabilityAndEffortsForHoursEffort()
      : reliabilitiesAndEfforts[0].hours_effort;

  const quocient = sumOfProductsFromReliabilityAndEffort / sumOfHoursEffort;

  const parsedQuocient = parseFloat(quocient.toFixed(3));

  try {
    await providersController.updateProviderReliability(fk_provider, parsedQuocient);
    return { ok: true };
  } catch (error) {
    console.log('error on update provider reliability', error);
    return error;
  }
};

module.exports = { updateReliability };
