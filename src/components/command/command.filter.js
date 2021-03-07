const { CrudFilter } = require("crud-component");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

class CommandFilter extends CrudFilter {
  createOne = (req, res, next) => {
    req.body.user = req.user.sub;

    next();
  };

  getAll = (req, res, next) => {
    const { projectId } = req.paginate.filter;
    const customFilters = {};

    customFilters["user"] = ObjectId(req.user.sub);
    projectId && (customFilters["project"] = ObjectId(projectId));

    req.paginate.filter = customFilters;

    next();
  };
}

const commandFilter = new CommandFilter();

module.exports = commandFilter;
