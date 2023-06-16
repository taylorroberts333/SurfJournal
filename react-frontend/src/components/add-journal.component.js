//add journal screen
//spaces for user to enter data
//posts that data once submitted
//create components that correspond to the routes defined in App.js
//also functions to get value from state
//send the POST request to the web API
import React, { Component } from "react"
import JournalDataService from "../services/journal.service"
import { useState, useCallback } from "react"
import Map, { Marker, FullscreenControl, GeolocateControl, NavigationControl } from "react-map-gl"

//get todays date to add to title
var today = new Date()
var dd = String(today.getDate()).padStart(2, "0")
var mm = String(today.getMonth() + 1).padStart(2, "0")
var yyyy = today.getFullYear()
//refactor today for use
today = mm + "/" + dd + "/" + yyyy

const eventNames = ["onDragEnd"]

const TOKEN = "pk.eyJ1IjoidGF5cGFpZ2VyIiwiYSI6ImNsZ3Z0ZzdzZjFlaDUzaHFpbHExMWM5MG4ifQ.I0dKtXWLkhV4IJT5oftd2w"
let coordinateString = "-13.40073, -56.94497"

function round5(value) {
   return (Math.round(value * 1e5) / 1e5).toFixed(5)
}

function setCoordinate(c) {
   coordinateString = c
}

function getCoordinate() {
   return coordinateString
}

function Mapper() {
   const [events, logEvents] = useState({})

   const onMarkerDragEnd = useCallback((event) => {
      const lngLat = event.lngLat
      logEvents((_events) => ({ ..._events, onDragEnd: lngLat }))
   }, [])

   return (
      <>
         <Map
            initialViewState={{
               latitude: -1.7,
               longitude: 99.3,
               zoom: 3,
            }}
            style={{ width: 500, height: 500 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={TOKEN}
         >
            <GeolocateControl position="top-left" />
            <FullscreenControl position="top-left" />
            <NavigationControl position="top-left" />
            <Marker draggable="true" longitude={99.3} latitude={-1.7} color="blue" onDragEnd={onMarkerDragEnd} />
         </Map>
         <div className="control-panel">
            <div>
               {eventNames.map((eventName) => {
                  setCoordinate(coordinateString)
                  const lngLat = events[eventName]
                  coordinateString = lngLat ? `${round5(lngLat.lng)}, ${round5(lngLat.lat)}` : "-13.40073, -56.94497"
                  setCoordinate(coordinateString)
                  return <div key={eventName}>{<h1 style={{ color: "#0693E3" }}>{coordinateString}</h1>}</div>
               })}
            </div>
         </div>
      </>
   )
}

export default class AddJournal extends Component {
   //define constructor and set the initial state to this for all events
   constructor(props) {
      super(props)
      this.onChangeTitle = this.onChangeTitle.bind(this)
      this.onChangeSpot = this.onChangeSpot.bind(this)
      this.onChangeCoordinate = this.onChangeCoordinate.bind(this)
      this.onChangeSize = this.onChangeSize.bind(this)
      this.onChangeBoard = this.onChangeBoard.bind(this)
      this.onChangeDescription = this.onChangeDescription.bind(this)
      this.saveJournal = this.saveJournal.bind(this)
      this.newJournal = this.newJournal.bind(this)

      this.state = {
         id: null,
         title: today,
         spot: "",
         size: "",
         board: "",
         description: "",
         coordinates: "-13.40073, -56.94497",

         submitted: false,
      }
   }

   //for all fields of input set the state for changes
   onChangeTitle(e) {
      this.setState({
         //user can change day if needed to add previous days
         title: e.target.value,
      })
   }

   onChangeSpot(e) {
      this.setState({
         spot: e.target.value,
      })
   }

   onChangeCoordinate(e) {
      this.setState({
         coordinates: getCoordinate(),
      })
   }

   onChangeSize(e) {
      this.setState({
         size: e.target.value,
      })
   }

   onChangeBoard(e) {
      this.setState({
         board: e.target.value,
      })
   }

   onChangeDescription(e) {
      this.setState({
         description: e.target.value,
      })
   }

   saveJournal() {
      var data = {
         title: this.state.title,
         spot: this.state.spot,
         size: this.state.size,
         board: this.state.board,
         description: this.state.description,
         coordinates: getCoordinate(),
      }

      //when data posted
      JournalDataService.create(data)
         .then((response) => {
            this.setState({
               id: response.data.id,
               title: response.data.title,
               spot: response.data.spot,
               size: response.data.size,
               board: response.data.board,
               description: response.data.description,
               coordinates: response.data.coordinates,

               submitted: true,
            })
            console.log(response.data)
         })
         .catch((e) => {
            console.log(e)
         })
   }

   newJournal() {
      this.setState({
         id: null,
         title: today,
         spot: "",
         size: "",
         board: "",
         description: "",
         coordinates: getCoordinate(),

         submitted: false,
      })
   }

   render() {
      //check the submitted state
      //if true show add button for creating another journal
      return (
         <div className="submit-form">
            <div class="two-columns-grid">
               <div>
                  {this.state.submitted ? (
                     <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" style={{ background: "#0693E3" }} onClick={this.newJournal}>
                           Add
                        </button>
                     </div>
                  ) : (
                     <div>
                        <div className="form-group">
                           <label htmlFor="title">Date</label>
                           <input type="date" className="form-control" id="title" required value={this.state.title} onChange={this.onChangeTitle} name="title" />
                        </div>

                        <div className="form-group">
                           <label htmlFor="spot">Location</label>
                           <input type="text" className="form-control" id="spot" required value={this.state.spot} onChange={this.onChangeSpot} name="spot" />
                        </div>
                        <div className="form-group">
                           <label htmlFor="coord">Coordinate</label>
                           <input type="text" className="form-control" id="coord" required value={this.state.coordinates} onChange={this.onChangeCoordinate} name="coord" />
                        </div>

                        <div className="form-group">
                           <label htmlFor="size">Size</label>
                           <br />
                           <select id="size" required value={this.state.size} onChange={this.onChangeSize} name="size">
                              <option value="0-1">0-1 ft.</option>
                              <option value="1-2">1-2 ft.</option>
                              <option value="2-3">2-3 ft.</option>
                              <option value="3-4">3-4 ft.</option>
                              <option value="4-5">4-5 ft.</option>
                              <option value="5-6">5-6 ft.</option>
                              <option value="6-7">6-7 ft.</option>
                              <option value="7-8">7-8 ft.</option>
                              <option value="8-9">8-9 ft.</option>
                              <option value="9-10">9-10 ft.</option>
                              <option value="10+">10+ ft.</option>
                           </select>
                        </div>

                        <div className="form-group">
                           <label htmlFor="board">Board</label>
                           <input type="text" className="form-control" id="board" required value={this.state.board} onChange={this.onChangeBoard} name="board" />
                        </div>

                        <div className="form-group">
                           <label htmlFor="description">Notes</label>
                           <input type="text" className="form-control" id="description" required value={this.state.description} onChange={this.onChangeDescription} name="description" />
                        </div>
                        <button style={{ background: "#0693E3" }} onClick={this.saveJournal} className="btn btn-success">
                           Submit
                        </button>
                     </div>
                  )}
               </div>
               <div>
                  <Mapper />
               </div>
            </div>
         </div>
      )
   }
}
