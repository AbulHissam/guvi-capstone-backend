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
const apiBaseUrl = appConstants.API_BASE_URL;
app.use(`${apiBaseUrl}/users`, routes.userRoutes);

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
