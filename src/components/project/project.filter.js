const { CrudFilter } = require("crud-component");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

class ProjectFilter extends CrudFilter {
  createOne = (req, res, next) => {
    req.body.user = req.user.sub;

    next();
  };

  getAll = (req, res, next) => {
    const customFilters = {};

    customFilters["user"] = ObjectId(req.user.sub);

    req.paginate.filter = customFilters;

    next();
  };
}

const projectFilter = new ProjectFilter();

module.exports = projectFilter;
