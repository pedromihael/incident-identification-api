const severitiesController = require('../../severity/controllers');
const projectsController = require('../controllers');

const updateReliability = async (fk_project, fk_severity, incidentsByProject) => {
  const newIncidentWeight = await severitiesController.getSeverityById(fk_severity);
  const project = await projectsController.getProjectById(fk_project);

  let incidentsGroupedByWeights = [];

  if (newIncidentWeight.length) {
    const { weight } = newIncidentWeight[0];
    incidentsGroupedByWeights.push({ weight, quantity: 1 });
  }

  if (incidentsByProject.length) {
    for await (const incident of incidentsByProject) {
      const severities = await severitiesController.getSeverityById(incident.fk_severity);
      const incidentWeight = severities[0].weight;
      const weightGroup = incidentsGroupedByWeights.find((group) => group.weight === incidentWeight);
      if (weightGroup) {
        const withoutThisGroup = incidentsGroupedByWeights.filter((group) => group.weight !== incidentWeight);
        incidentsGroupedByWeights = [
          ...withoutThisGroup,
          { weight: incidentWeight, quantity: weightGroup.quantity + 1 },
        ];
      } else {
        incidentsGroupedByWeights.push({ weight: incidentWeight, quantity: 1 });
      }
    }
  }

  const sumOfProductsFromWeightsAndQuantities = incidentsGroupedByWeights.reduce((prev, curr) => {
    if (prev.hasOwnProperty('weight')) {
      return prev.weight * prev.quantity + curr.weight * curr.quantity;
    } else {
      return prev + curr.weight * curr.quantity;
    }
  });

  const quocient = sumOfProductsFromWeightsAndQuantities / project.hours_effort;

  const decimalPercentage = 1 - quocient;

  const percentage = parseFloat(decimalPercentage.toFixed(3)) * 100;

  try {
    await projectsController.updateProjectReliability(fk_project, percentage);
    return { ok: true };
  } catch (error) {
    console.log('error on update project reliability', error);
    return error;
  }
};

module.exports = { updateReliability };
