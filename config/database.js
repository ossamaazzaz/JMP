const Sequelize = require("sequelize");
require("custom-env").env(true);

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: "localhost",
		dialect: "postgres",
		operatorsAliases: false,
		logging: false,
		// port: 5433,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	}
);

module.exports = sequelize;
