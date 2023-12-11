import app from "./src/app";
import config from "./src/config/serverConfig";

app.listen(config.port, () =>
  console.log(
    `${config.appName} server started on ${config.enviroment}: ${config.url}:${config.port}`
  )
);
