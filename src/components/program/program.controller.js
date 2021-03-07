const { CrudController } = require("crud-component");

const programService = require("./program.service");

class ProgramController extends CrudController {
  constructor() {
    super({
      serviceName: "programService",
      idName: "programId",
      successMessages: {
        createOne: "¡Programa creado!",
        getAll: "¡Programas obtenidos!",
        getOne: "¡Programa obtenido!",
        updateOne: "¡Programa actualizado!",
        deleteOne: "¡Programa eliminado!",
        reorderAll: "¡Programas reordenados!",
      },
    });
  }

  programService = programService;
}

const programController = new ProgramController();

module.exports = programController;