const baseComponent = "./components";

const router = (server) => {
  server.use("/programs", require(`${baseComponent}/program/program.route`));
  server.use("/commands", require(`${baseComponent}/command/command.route`));
  server.use("/projects", require(`${baseComponent}/project/project.route`));
  server.use("/users", require(`${baseComponent}/user/user.route`));
  server.use("/auth", require(`${baseComponent}/auth/auth.route`));
};

module.exports = router;
