const incidentsController = require('../../incident/controllers');

export const getProjectReliability = async (fk_project) => {
  // pegar todos os incidentes desse projeto
  // pegar esforço desse projeto

  const incidentsInThisProject = await incidentsController.getIncidentsByProject(fk_project);

  if (incidentsInThisProject.length) {
    // mapear incidentes
  }
};

//TODO: fazer o get new project reliability passando a severidade nova
