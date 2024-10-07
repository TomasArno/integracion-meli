import { config } from "dotenv";
export function checkEnv() {
  const env = process.argv[3];
  console.log(env);

  if (env == "development") {
    loadEnvVars();
  }
}

function loadEnvVars() {
  config();
}
