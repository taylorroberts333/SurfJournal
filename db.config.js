//configure mySQL database
module.exports = {
   HOST: "127.0.0.1",
   USER: "root",
   PASSWORD: "",
   DB: "JournalDB",
   dialect: "mysql",
   //for sequilize connection configuration
   pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
   },
};
