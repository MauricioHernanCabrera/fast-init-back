const { CrudService } = require("crud-component");
const ExceptionResponseError = require("exception-response-error");

const CommandModel = require("./models/command.model");
const projectService = require("./../project/project.service");
const programService = require("./../program/program.service");

class CommandService extends CrudService {
  constructor() {
    super({
      modelName: "CommandModel",
      notFoundMessage: "¡No se encontro el comando!",
    });

    this.CommandModel = CommandModel;
    this.selectDoc = "_id user project program params createdAt updatedAt";

    this.existDocMessage = "¡No se encontro el comando!";
    this.notExistDocMessage = "¡El comando ya existe!";

    this.populateDoc = [
      {
        path: "project",
      },
      {
        path: "program",
      },
    ];

    this.aggregateDocAfterFilter = [
      {
        $lookup: {
          from: "projects",
          localField: "project",
          foreignField: "_id",
          as: "project",
        },
      },

      {
        $unwind: "$project",
      },

      {
        $lookup: {
          from: "programs",
          localField: "program",
          foreignField: "_id",
          as: "program",
        },
      },

      {
        $unwind: "$program",
      },
    ];
  }

  formatDoc = ({ _id, user, project, program, params, createdAt, updatedAt }) => {
    return {
      _id,
      user,
      project,
      program,
      params,
      createdAt,
      updatedAt,
    };
  };

  createOne = async (data) => {
    await Promise.all([
      programService.existDoc(data.program, { status: 400 }),
      projectService.existDoc(data.project, { status: 400 }),
    ]);

    const newCommand = this.CommandModel(data);

    const [commandCreated, ,] = await Promise.all([
      newCommand.save(),
      projectService.addCommand(data.project, newCommand._id),
      this.CommandModel.populate(newCommand, this.populateDoc),
    ]);

    return this.formatDoc(commandCreated);
  };

  deleteOne = async (commandId) => {
    const commandDeleted = await this.CommandModel.findOneAndUpdate(
      { [this.filterKey]: commandId, isActive: true },
      { isActive: false }
    );

    if (!commandDeleted) {
      throw new ExceptionResponseError({
        status: 404,
        message: this.notFoundMessage,
      });
    }

    await projectService.removeCommand(commandDeleted.project, commandDeleted._id);
  };

  isCommandOwner = async (userId, commandId) => {
    const programFounded = await this.CommandModel.findOne({
      _id: commandId,
      user: userId,
    });

    if (!programFounded) {
      return Promise.reject({
        message: "No sos dueño del comando",
        status: 400,
      });
    }
  };
}

const commandService = new CommandService();

module.exports = commandService;
