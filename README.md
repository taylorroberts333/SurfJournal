# The Surf Journal

https://github.com/taylorroberts333/SurfJournal/assets/83095073/6bbbfa94-e7b9-42ae-876d-af8964502c10

## Description
The initial problem that the project "The Surf Journal" was trying to solve was to create a web application that allows surfers, body-boarders, paddle-boarders, and body-surfers to keep a log of their surfing activities. The goal was to provide a platform where users could easily create journal entries, view their past entries, update/edit existing entries, and have the ability to delete entries if needed. The application was also intended to have map functionality, allowing users to save their surf locations and view them on a map. Additionally, the project aimed to provide an intuitive and user-friendly interface for managing journal logs.

Created a backend: Node.js, JavaScript, REST API's, with an Express web server, added configuration to MySQL database using sequelize. Created a frontend: React CRUD application, using JavaScript, HTML, React Router, Bootstrap, and Axios. Now can consume REST API's, display, search, and modify data in a clean way. Applied to personal application, "The Surf Journal" in order to log locations, board used, size of waves, date, and more for any given surf. Ability to retrieve, modify, delete, and create new journal entrys, storing and updating database.

## User Stories
![Brainstorming](https://github.com/taylorroberts333/SurfJournal/assets/83095073/90c6a01d-a05f-42e8-be5e-f05609f269bf)
![Brainstorming (1)](https://github.com/taylorroberts333/SurfJournal/assets/83095073/c1e87f4b-c0d5-4457-805c-e06449ff7737)
![Brainstorming (2)](https://github.com/taylorroberts333/SurfJournal/assets/83095073/50e06a96-6708-4d87-a840-e6e79d6ea301)

## Test Cases
![Brainstorming (3)](https://github.com/taylorroberts333/SurfJournal/assets/83095073/40478ccd-34fa-4106-b95a-7d89343b73c3)

## Future Development
Due to backend hosting and deploying bugs, the stretch goals of tide tracking and user authentication were not fully implemented in the delivered code of "The Surf Journal" project. These goals were initially planned to enhance the functionality and security of the application but faced challenges during the deployment process. The intention behind the tide tracking feature was to provide users with valuable information about tides for their chosen surfing locations. This information would assist them in selecting the optimal time for their surfing sessions. However, due to the hosting and deployment issues, the integration with a reliable and accurate tide data provider could not be completed. As a result, the tide-tracking functionality could not be fully realized. User authentication is a crucial component for ensuring the security and privacy of user data within the application. It was intended to allow users to create individual accounts, log in securely, and have their journal entries associated with their specific accounts. However, the deployment issues and bugs prevented the successful implementation of user authentication. Consequently, the application lacked the capability to authenticate and manage user accounts. Despite these challenges, the core functionality of the application, such as creating, updating, and deleting journal entries, remained intact. The focus was primarily on delivering the essential features while acknowledging that the stretch goals could not be fully realized within the given constraints. It is worth noting that although the tide tracking and user authentication stretch goals were not met in the final delivered code, they could be potential areas for future development and improvement, should the hosting and deployment challenges be addressed.

### Each File
Backend:
- db.config.js configures mySQL database
- journal.controller.js where all API functions are, creation and implementation, supported by sequelize
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
