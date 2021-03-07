const ExceptionResponseError = require("exception-response-error");
const { CrudSecurity } = require("crud-component");
const programService = require("./program.service");

class ProgramSecurity extends CrudSecurity {
  isProgramOwner = async (req, res, next) => {
    try {
      const programId = req.params.programId;
      const userId = req.user.sub;

      await programService.isProgramOwner(userId, programId);
      next();
    } catch (error) {
      next(error);
    }
  };

  getOne = this.isProgramOwner;

  updateOne = this.isProgramOwner;

  deleteOne = this.isProgramOwner;
}

const programSecurity = new ProgramSecurity();

module.exports = programSecurity;
