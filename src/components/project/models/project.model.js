const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const finalMongooseAggregatePaginatePlugin = require("final-mongoose-aggregate-paginate");
const mongooseReorderPlugin = require("mongoose-reorder");

const ProjectSchema = Schema(
  {
    user: {
      type: ObjectId,
      ref: "Users",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    commands: [
      {
        type: ObjectId,
        ref: "Commands",
        default: [],
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

ProjectSchema.plugin(finalMongooseAggregatePaginatePlugin);
ProjectSchema.plugin(mongooseReorderPlugin);

const ProjectModel = model("Projects", ProjectSchema);

module.exports = ProjectModel;
