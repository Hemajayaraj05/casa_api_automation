import dotenv from "dotenv";


const envFile = process.env.ENV === "prod" ? ".env.prod" : ".env.qa";
dotenv.config({ path: envFile });

export const config = {
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  },
  baseUrl: process.env.BASE_URL!,
};
