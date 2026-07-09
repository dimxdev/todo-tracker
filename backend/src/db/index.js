import { Sequelize } from "sequelize";
import configFile from "../../config/config.cjs";

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

export const sequelize = new Sequelize(config);
