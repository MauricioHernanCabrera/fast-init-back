const { CrudController } = require("crud-component");

const commandService = require("./command.service");

class CommandController extends CrudController {
  constructor() {
    super({
      serviceName: "commandService",
      idName: "commandId",
      successMessages: {
        createOne: "¡Comando creado!",
        getAll: "¡Comandos obtenidos!",
        getOne: "¡Comando obtenido!",
        updateOne: "¡Comando actualizado!",
        deleteOne: "¡Comando eliminado!",
        reorderAll: "¡Comandos reordenados!",
      },
    });
  }

  commandService = commandService;
}

const commandController = new CommandController();

module.exports = commandController;