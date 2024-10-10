import { Dialect, Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
  }
);

export { DataTypes };
export default sequelize;
