const severitiesController = require('../../severity/controllers');
const projectsController = require('../controllers');

const updateReliability = async (fk_project, fk_severity, incidentsByProject, type) => {
  const project = await projectsController.getProjectById(fk_project);

  let incidentsGroupedByWeights = [];

  if (type === 'create') {
    const newIncidentWeight = await severitiesController.getSeverityById(fk_severity);
    if (newIncidentWeight.length) {
      const { weight } = newIncidentWeight;
      incidentsGroupedByWeights.push({ weight, quantity: 1 });
    }
  }

  // if type === 'update', fk_severity is the new severity of the weight,  so incident.fk_severity is already the updated one

  if (incidentsByProject.length) {
    for await (const incident of incidentsByProject) {
      const severities = await severitiesController.getSeverityById(incident.fk_severity);
      const incidentWeight = severities.weight;
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

  let sumOfProductsFromWeightsAndQuantities = 0

  switch (incidentsGroupedByWeights.length) {
    case 0:
      sumOfProductsFromWeightsAndQuantities = 0
      break
    case 1:
      sumOfProductsFromWeightsAndQuantities = incidentsGroupedByWeights[0].weight * incidentsGroupedByWeights[0].quantity;
      break
    default:
      sumOfProductsFromWeightsAndQuantities = incidentsGroupedByWeights.reduce((prev, curr) => {
        if (prev.hasOwnProperty('weight')) {
          return prev.weight * prev.quantity + curr.weight * curr.quantity;
        } else {
          return prev + curr.weight * curr.quantity;
        }
      })
  }

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
