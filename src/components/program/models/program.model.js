const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const finalMongooseAggregatePaginatePlugin = require("final-mongoose-aggregate-paginate");
const mongooseReorderPlugin = require("mongoose-reorder");

const ProgramSchema = Schema(
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

    url: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

ProgramSchema.plugin(finalMongooseAggregatePaginatePlugin);
ProgramSchema.plugin(mongooseReorderPlugin);

const ProgramModel = model("Programs", ProgramSchema);

module.exports = ProgramModel;
