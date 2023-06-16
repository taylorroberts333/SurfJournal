//create component for front page that displays....
//search bar for finding the journals by date of surf
//an array of all surfs
//the journal information once it is selected
import React, { Component } from "react"
import Map, { Marker, FullscreenControl, NavigationControl, GeolocateControl } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import JournalDataService from "../services/journal.service"
import { Link } from "react-router-dom"

const MAPBOX_TOKEN = "pk.eyJ1IjoidGF5cGFpZ2VyIiwiYSI6ImNsZ3Z0ZzdzZjFlaDUzaHFpbHExMWM5MG4ifQ.I0dKtXWLkhV4IJT5oftd2w"

export default class JournalsList extends Component {
   constructor(props) {
      //keeps track of the following states
      //search Date
      //journals
      //current journal
      //current index
      //uses also 3 methods created by journalDataService
      //getAll()
      //deleteAll()
      //findByDate()
      super(props)
      this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this)
      this.retrieveJournals = this.retrieveJournals.bind(this)
      this.refreshList = this.refreshList.bind(this)
      this.setActiveJournal = this.setActiveJournal.bind(this)
      this.removeAllJournals = this.removeAllJournals.bind(this)
      this.searchTitle = this.searchTitle.bind(this)

      this.state = {
         journals: [],
         currentJournal: null,
         currentIndex: -1,
         searchTitle: "",
      }
   }

   componentDidMount() {
      this.retrieveJournals()
   }

   onChangeSearchTitle(e) {
      const searchTitle = e.target.value

      this.setState({
         searchTitle: searchTitle,
      })
   }

   retrieveJournals() {
      JournalDataService.getAll()
         .then((response) => {
            this.setState({
               journals: response.data,
            })
            console.log(response.data)
         })
         .catch((e) => {
            console.log(e)
         })
   }

   refreshList() {
      this.retrieveJournals()
      this.setState({
         currentJournal: null,
         currentIndex: -1,
      })
   }

   setActiveJournal(journal, index) {
      this.setState({
         currentJournal: journal,
         currentIndex: index,
      })
   }

   removeAllJournals() {
      JournalDataService.deleteAll()
         .then((response) => {
            console.log(response.data)
            this.refreshList()
         })
         .catch((e) => {
            console.log(e)
         })
   }

   searchTitle() {
      JournalDataService.findByTitle(this.state.searchTitle)
         .then((response) => {
            this.setState({
               journals: response.data,
            })
            console.log(response.data)
         })
         .catch((e) => {
            console.log(e)
         })
   }

   render() {
      const { searchTitle, journals, currentJournal, currentIndex } = this.state

      const allCoordinates = journals.map((journal) => journal.coordinates)
      console.log(allCoordinates)

      //console.log("here", arrayColumn(JournalDataService.getAll(), 2))
      //functionality if you click on any edit button on any journals
      //will direct to journal page and the ability to delete or update it
      //use React Router link for accessing that page with the URL /journals/:id
      return (
         <div className="lefter">
            <div className="col-md-11">
               <div className="list row">
                  <div className="col-md-8">
                     <h4>Search By Day:</h4>
                     <div className="input-group mb-3">
                        <input type="date" className="form-control" placeholder="Search by date (01/02/1941)" value={searchTitle} onChange={this.onChangeSearchTitle} />
                        <span>
                           <div className="input-group-append">
                              <button className="btn btn-outline-secondary" type="button" onClick={this.searchTitle}>
                                 Search
                              </button>
                           </div>
                        </span>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <h4>All Logged Surfs</h4>
                     <ul className="list-group">
                        {journals &&
                           journals.map((journal, index) => (
                              <li className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => this.setActiveJournal(journal, index)} key={index}>
                                 {journal.title} at {journal.spot}
                              </li>
                           ))}
                     </ul>
                  </div>
                  <div className="col-md-6">
                     {currentJournal ? (
                        <div>
                           <h4>Surf Info</h4>
                           <div>
                              <label>
                                 <strong>Date:</strong>
                              </label>{" "}
                              {currentJournal.title}
                           </div>
                           <div>
                              <label>
                                 <strong>Location:</strong>
                              </label>{" "}
                              {currentJournal.spot}
                           </div>
                           <div>
                              <label>
                                 <strong>Coordinates:</strong>
                              </label>{" "}
                              {currentJournal.coordinates}
                           </div>
                           <div>
                              <label>
                                 <strong>Size:</strong>
                              </label>{" "}
                              {currentJournal.size}
                           </div>
                           <div>
                              <label>
                                 <strong>Board:</strong>
                              </label>{" "}
                              {currentJournal.board}
                           </div>
                           <div>
                              <label>
                                 <strong>Notes:</strong>
                              </label>{" "}
                              {currentJournal.description}
                           </div>

                           <Link to={"/journals/" + currentJournal.id} className="badge badge-pill badge-info" style={{ background: "#0693E3" }}>
                              Edit
                           </Link>
                           <div class=".me-5">
                              <a class="badge badge-pill badge-info" style={{ background: "#0693E3" }} href="/journals">
                                 View all logs
                              </a>
                           </div>
                        </div>
                     ) : (
                        <div>
                           <br />
                           <p>Please click on a surf to edit, update, or look back through the journal!</p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
            <div className="col-md-8">
               <Map
                  initialViewState={{
                     latitude: 37.8,
                     longitude: -122.4,
                     zoom: 0,
                  }}
                  style={{ width: 500, height: 500 }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken={MAPBOX_TOKEN}
               >
                  <GeolocateControl position="top-left" />
                  <FullscreenControl position="top-left" />
                  <NavigationControl position="top-left" />
                  {allCoordinates.map((coords) => (
                     <Marker longitude={coords.split(",")[0]} latitude={coords.split(",")[1]} anchor="bottom" color="blue"></Marker>
                  ))}
               </Map>
            </div>
         </div>
      )
   }
}
