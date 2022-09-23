//initializes axios with HTTP base Url and headers.
//AXIOS HTTP client based library
import axios from "axios";

//makes sending asyncronous HTTP requests to REST endpoints easier
//helps preform CRUD operations
export default axios.create({
   baseURL: "http://localhost:8080/api",
   headers: {
      "Content-type": "application/json",
   },
});
