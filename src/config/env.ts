import dotenv from "dotenv";
dotenv.config();

type Environment = "qa" | "prod";

export const ENV: Environment = (process.env.TEST_ENV as Environment) || "qa";

const configs: Record<Environment, { creationBaseURL: string; listingBaseURL: string }> = {
  qa: {
    listingBaseURL: "https://api.customerstudioqa.ajira.tech",
    creationBaseURL: "https://api.casaqa.ajira.tech",
  },
  prod: {
       creationBaseURL: "https://walkin.casa.ajira.tech",
    listingBaseURL: "https://api.casa.ajira.tech",
  },
};

export const currentEnv = configs[ENV];

