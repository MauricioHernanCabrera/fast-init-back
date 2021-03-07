const { CrudService } = require("crud-component");

const ProgramModel = require("./models/program.model");

class ProgramService extends CrudService {
  constructor() {
    super({
      modelName: "ProgramModel",
      notFoundMessage: "¡No se encontro el programa!",
    });

    this.ProgramModel = ProgramModel;
    this.selectDoc = "_id name url user";

    this.existDocMessage = "¡No se encontro el programa!";
    this.notExistDocMessage = "¡El programa ya existe!";
  }

  formatDoc = ({ _id, name, url, user, createdAt, updatedAt }) => {
    return { _id, name, url, user, createdAt, updatedAt };
  };

  isProgramOwner = async (userId, programId) => {
    const programFounded = await this.ProgramModel.findOne({
      _id: programId,
      user: userId,
    });

    if (!programFounded) {
      return Promise.reject({
        message: "No sos dueño del programa",
        status: 400,
      });
    }
  };
}

const programService = new ProgramService();

module.exports = programService;
