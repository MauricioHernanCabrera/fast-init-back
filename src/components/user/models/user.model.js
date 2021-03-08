const { Schema, model } = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");
const finalMongooseAggregatePaginatePlugin = require("final-mongoose-aggregate-paginate");

const ProviderSchema = Schema(
  {
    id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      enum: ["GOOGLE"],
      required: true,
    },
  },
  { _id: false }
);

const UserSchema = Schema(
  {
    picture: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: [null, "ROLE_ADMIN"],
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    providers: [
      {
        type: ProviderSchema,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(finalMongooseAggregatePaginatePlugin);

const UserModel = model("Users", UserSchema);

module.exports = UserModel;
