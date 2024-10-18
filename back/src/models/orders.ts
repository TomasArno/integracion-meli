import sequelize, { DataTypes } from "../database";

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  test: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Order;
