const ExceptionResponseError = require("exception-response-error");
const { CrudSecurity } = require("crud-component");

const commandService = require("./command.service");
const projectService = require("./../project/project.service");
const programService = require("./../program/program.service");

class CommandSecurity extends CrudSecurity {
  isCommandOwner = async (req, res, next) => {
    try {
      const commandId = req.params.commandId;
      const userId = req.user.sub;

      await commandService.isCommandOwner(userId, commandId);
      next();
    } catch (error) {
      next(error);
    }
  };

  createOne = async (req, res, next) => {
    try {
      const { program, project } = req.body;
      const { sub: userId } = req.user;

      await Promise.all([
        programService.isProgramOwner(userId, program),
        projectService.isProjectOwner(userId, project),
      ]);

      next();
    } catch (error) {
      next(error);
    }
  };

  updateOne = async (req, res, next) => {
    try {
      const commandId = req.params.commandId;
      const userId = req.user.sub;
      const programId = req.body.program;

      await Promise.all([
        commandService.isCommandOwner(userId, commandId),
        programService.isProgramOwner(userId, programId),
      ]);

      next();
    } catch (error) {
      next(error);
    }
  };

  getOne = this.isCommandOwner;
  deleteOne = this.isCommandOwner;
}

const commandSecurity = new CommandSecurity();

module.exports = commandSecurity;
