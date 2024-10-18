import { config } from "dotenv";

(function checkEnv() {
  const env = process.argv[3];

  if (env == "development") {
    loadEnvVars();
  }
})();

function loadEnvVars() {
  config();
}
