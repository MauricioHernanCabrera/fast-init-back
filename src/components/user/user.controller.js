const { CrudController } = require("crud-component");

const userService = require("./user.service");

class UserController extends CrudController {
  constructor() {
    super({
      serviceName: "userService",
      idName: "userId",
      successMessages: {
        createOne: "¡Usuario creado!",
        getAll: "¡Usuarios obtenidos!",
        getOne: "¡Usuario obtenido!",
        updateOne: "¡Usuario actualizado!",
        deleteOne: "¡Usuario eliminado!",
        reorderAll: "¡Usuarios reordenados!",
      },
    });
  }

  userService = userService;

  verifyEmail = async ({ body: data }) => {
    return {
      body: await this.userService.verifyEmail(data),
      message: "¡Email disponible!",
      status: 200,
    };
  };

  verifyUsername = async ({ body: data }) => {
    return {
      body: await this.userService.verifyUsername(data),
      message: "¡Nombre de usuario disponible!",
      status: 200,
    };
  };

  getUserProfile = async ({ user }) => {
    return {
      body: await this.userService.getOne(user.sub),
      message: "Datos del usuario",
      status: 200,
    };
  };
}

const userController = new UserController();

module.exports = userController;
