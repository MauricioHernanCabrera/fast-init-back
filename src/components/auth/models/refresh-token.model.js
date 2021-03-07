const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const RefreshTokenSchema = Schema(
  {
    user: {
      type: ObjectId,
      ref: "Users",
      required: true,
    },

    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const RefreshTokenModel = model("RefreshTokens", RefreshTokenSchema);

module.exports = RefreshTokenModel;
