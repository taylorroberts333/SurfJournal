require('dotenv').config()


module.exports = {
   HOST: process.env.DB_ENDPOINT,
   USER: process.env.DB_USERNAME,
   PASSWORD: process.env.DB_PASSWORD,
   DB: process.env.DB_DATABASE,
   dialect: "mysql",
   port: 3306,
   //for sequilize connection configuration
   pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
   },
};
