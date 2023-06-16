//define sequilize model
//represents the journal table in the database
//these columns will be generated in the table as follows
module.exports = (sequelize, Sequelize) => {
   const Journal = sequelize.define("journal", {
      title: {
         type: Sequelize.STRING,
      },
      spot: {
         type: Sequelize.STRING,
      },
      size: {
         type: Sequelize.STRING,
      },
      board: {
         type: Sequelize.STRING,
      },
      description: {
         type: Sequelize.STRING,
      },
      coordinates: {
         type: Sequelize.STRING,
      },
   })
   return Journal
}
