const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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

    password: {
      type: String,
      default: null,
    },

    resetPasswordToken: {
      type: String,
      default: "",
    },

    resetPasswordExpires: {
      type: Date,
      default: Date.now(),
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

UserSchema.methods.setPassword = async function (password) {
  const passwordHash = await bcrypt.hash(password, 10);
  this.password = passwordHash;
  await this.save();
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const UserModel = model("Users", UserSchema);

module.exports = UserModel;
