const { CrudController } = require("crud-component");

const projectService = require("./project.service");

class ProjectController extends CrudController {
  constructor() {
    super({
      serviceName: "projectService",
      idName: "projectId",
      successMessages: {
        createOne: "¡Proyecto creado!",
        getAll: "¡Proyectos obtenidos!",
        getOne: "¡Proyecto obtenido!",
        updateOne: "¡Proyecto actualizado!",
        deleteOne: "¡Proyecto eliminado!",
        reorderAll: "¡Proyectos reordenados!",
      },
    });
  }

  projectService = projectService;
}

const projectController = new ProjectController();

module.exports = projectController;