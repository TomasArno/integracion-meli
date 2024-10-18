import sequelize from ".";

function syncDb() {
  sequelize.sync();
}

export default syncDb;
