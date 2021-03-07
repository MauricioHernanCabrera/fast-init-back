const { CrudService } = require("crud-component");

const ProjectModel = require("./models/project.model");

class ProjectService extends CrudService {
  constructor() {
    super({
      modelName: "ProjectModel",
      notFoundMessage: "¡No se encontro el proyecto!",
    });

    this.ProjectModel = ProjectModel;
    this.selectDoc = "_id user name commands createdAt updatedAt";

    this.existDocMessage = "¡No se encontro el proyecto!";
    this.notExistDocMessage = "¡El proyecto ya existe!";

    this.aggregateDocBeforeFilter = [
      {
        $lookup: {
          from: "commands",
          localField: "commands",
          foreignField: "_id",
          as: "commands",
        },
      },

      {
        $unwind: {
          path: "$commands",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "programs",
          localField: "commands.program",
          foreignField: "_id",
          as: "commands.program",
        },
      },

      {
        $unwind: {
          path: "$commands.program",
          preserveNullAndEmptyArrays: true,
        },
      },

      // {
      //   $project: {
      //     // commands: {
      //     //   $cond: {
      //     //     if: { $eq: ["$commands._id", 0] },
      //     //     then: "asdasd",
      //     //     else: "[]",
      //     //   },
      //     // },
      //   },
      // },

      {
        $group: {
          _id: "$_id",
          commands: { $push: "$commands" },
          clone: { $first: "$$ROOT" },
        },
      },

      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ["$clone", { commands: "$commands" }] },
        },
      },

      {
        $addFields: {
          validationCommand: {
            $arrayElemAt: ["$commands", 0],
          },
        },
      },

      {
        $addFields: {
          commands: {
            $cond: {
              if: { $eq: ["$validationCommand", {}] },
              then: [],
              else: "$commands",
            },
          },
        },
      },

      {
        $project: {
          validationCommand: 0,
        },
      },
    ];

    this.populateDoc = [
      {
        path: "commands",
        populate: [
          {
            path: "program",
          },
        ],
      },
    ];
  }

  formatDoc = ({ _id, user, name, commands, createdAt, updatedAt }) => {
    return { _id, user, name, commands, createdAt, updatedAt };
  };

  isProjectOwner = async (userId, projectId) => {
    const programFounded = await this.ProjectModel.findOne({
      _id: projectId,
      user: userId,
    });

    if (!programFounded) {
      return Promise.reject({
        message: "No sos dueño del proyecto",
        status: 400,
      });
    }
  };

  addCommand = async (projectId, commandId) => {
    const projectUpdated = await this.ProjectModel.findOneAndUpdate(
      { _id: projectId, commands: { $ne: commandId } },
      { $push: { commands: commandId } },
      { new: true }
    );

    return projectUpdated;
  };

  removeCommand = async (projectId, commandId) => {
    const projectUpdated = await this.ProjectModel.findOneAndUpdate(
      { _id: projectId, commands: { $eq: commandId } },
      { $pull: { commands: commandId } },
      { new: true }
    );

    return projectUpdated;
  };
}

const projectService = new ProjectService();

module.exports = projectService;
