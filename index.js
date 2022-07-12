const express = require("express");
const dotenv = require("dotenv");
const { dbConfigs, appConstants } = require("./src/configs");
const routes = require("./src/routes");

// app setup
const app = express();
dotenv.config();
dbConfigs.connectToDB();

// middlewares
app.use(express.json());

// routes
app.use(appConstants.USERS_BASE_URL, routes.userRoutes);
app.use(appConstants.TASKS_BASE_URL, routes.taskRoutes);

// error handler
app.use((error, req, res, next) => {
  console.log(error);
  res
    .status(error.status || 500)
    .json({ status: error.status, message: error.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("app is up and running on port : ", PORT);
});
