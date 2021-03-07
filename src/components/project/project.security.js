const ExceptionResponseError = require("exception-response-error");
const { CrudSecurity } = require("crud-component");
const projectService = require("./project.service");

class ProjectSecurity extends CrudSecurity {
  isProjectOwner = async (req, res, next) => {
    try {
      const projectId = req.params.projectId;
      const userId = req.user.sub;

      await projectService.isProjectOwner(userId, projectId);
      next();
    } catch (error) {
      next(error);
    }
  };

  getOne = this.isProjectOwner;
  updateOne = this.isProjectOwner;
  deleteOne = this.isProjectOwner;
}

const projectSecurity = new ProjectSecurity();

module.exports = projectSecurity;
