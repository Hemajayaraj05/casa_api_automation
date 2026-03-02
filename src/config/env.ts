import dotenv from "dotenv";
dotenv.config();

type Environment = "qa" | "prod";

export const ENV: Environment = (process.env.TEST_ENV as Environment) || "qa";

const configs: Record<Environment, { baseURL: string }> = {
  qa: {
    baseURL: "https://api.casaqa.ajira.tech",
  },
  prod: {
    baseURL: "https://api.casa.ajira.tech",
  },
};

export const currentEnv = configs[ENV];

