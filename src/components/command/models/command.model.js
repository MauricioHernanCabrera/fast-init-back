const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const finalMongooseAggregatePaginatePlugin = require("final-mongoose-aggregate-paginate");
const mongooseReorderPlugin = require("mongoose-reorder");

const CommandSchema = Schema(
  {
    user: {
      type: ObjectId,
      ref: "Users",
      required: true,
    },

    project: {
      type: ObjectId,
      ref: "Projects",
      required: true,
    },

    program: {
      type: ObjectId,
      ref: "Programs",
      required: true,
    },

    params: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

CommandSchema.plugin(finalMongooseAggregatePaginatePlugin);
CommandSchema.plugin(mongooseReorderPlugin);

const CommandModel = model("Commands", CommandSchema);

module.exports = CommandModel;
