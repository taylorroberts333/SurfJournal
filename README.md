# The Surf Journal

## Description
Created a backend: Node.js, JavaScript, REST API's, with an Express web server, added configuration to MySQL database using sequelize. Created a frontend: React CRUD application, using JavaScript, HTML, React Router, Bootstrap, and Axios. Now can consume REST API's, display, search, and modify data in a clean way. Applied to personal application, "The Surf Journal" in order to log locations, board used, size of waves, date, and more for any given surf. Ability to retrieve, modify, delete, and create new journal entrys, storing and updating database.

### Each File
Backend:
- db.config.js configures mySQL database
- journal.controller.js where all API functions are, creattion and implementation, supported by sequelize
- index.js where the sequelize connection to the mySQL database is initialized
- journal.model.js defines the sequilize model and represents the journal in the database, represents columns
- journal.routes.js defines the routes for when a client sends request for an endpoint using an HTTP request, this is how the server will respond to the request
- server.js the root folder that contains necessary functions for initializing express to build REST API, to sync the database, check routes, and get port and listen for requests

Frontend: 
- add-journal.component.js for add journal screen, user enters data, sends POST to web API, creates components that correspond to the routes defined, gets value from state
- journal.component.js details component, this allows to get, update, and delete a journal. Posting an update to the database, retrieving journal from database, or deleting a journal.
- journals-list.component.js page that displays all journals in list by date and location, search bar for allowing search by date, an array for all logs, displays journal information once selected. keeps track of states.
- journal.service.js holds JournalDataService() funciton, uses axios to send HTTP requests to API
- App.js holds formatting and configuration for front page navbar, including the list of all journals, display of journal information, link to add and journal pages on navbar 
- http-common.js initializes axios
- index.js initializes browserrouter from react-router-dom and wraps /app
- .env port configuration
