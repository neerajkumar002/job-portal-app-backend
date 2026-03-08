import { config } from "dotenv";

// config env
config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const { PORT, DB_URL, NODE_ENV } = process.env;
