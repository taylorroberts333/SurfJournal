//details component
//using the JournalDataService methods get, update, and delete
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
                  coordinateString = lngLat ? `${round5(lngLat.lng)}, ${round5(lngLat.lat)}` : "37.8, -122.4"
                  setCoordinate(coordinateString)
                  return <div key={eventName}>{<h1 style={{ color: "#0693E3" }}>{coordinateString}</h1>}</div>
               })}
            </div>
         </div>
      </>
   )
}
export default class Journal extends Component {
   constructor(props) {
      super(props)
      this.onChangeTitle = this.onChangeTitle.bind(this)
      this.onChangeSpot = this.onChangeSpot.bind(this)
      this.onChangeCoordinate = this.onChangeCoordinate.bind(this)
      this.onChangeSize = this.onChangeSize.bind(this)
      this.onChangeBoard = this.onChangeBoard.bind(this)
      this.onChangeDescription = this.onChangeDescription.bind(this)
      this.getJournal = this.getJournal.bind(this)
      this.updateJournal = this.updateJournal.bind(this)
      this.deleteJournal = this.deleteJournal.bind(this)

      this.state = {
         currentJournal: {
            id: null,
            title: "",
            spot: "",
            size: "",
            board: "",
            description: "",
            coordinates: "-13.40073, -56.94497",
         },
         message: "",
      }
   }

   //to fetch the data from the web API
   componentDidMount() {
      this.getJournal(this.props.match.params.id)
   }

   onChangeTitle(e) {
      const title = e.target.value

      this.setState(function (prevState) {
         return {
            currentJournal: {
               ...prevState.currentJournal,
               title: title,
            },
         }
      })
   }

   onChangeSpot(e) {
      const spot = e.target.value

      this.setState((prevState) => ({
         currentJournal: {
            ...prevState.currentJournal,
            spot: spot,
         },
      }))
   }

   onChangeCoordinate(e) {
      this.setState((prevState) => ({
         currentJournal: {
            ...prevState.currentJournal,
            coordinates: getCoordinate(),
         },
      }))
   }

   onChangeSize(e) {
      const size = e.target.value

      this.setState((prevState) => ({
         currentJournal: {
            ...prevState.currentJournal,
            size: size,
         },
      }))
   }

   onChangeBoard(e) {
      const board = e.target.value

      this.setState((prevState) => ({
         currentJournal: {
            ...prevState.currentJournal,
            board: board,
         },
      }))
   }

   onChangeDescription(e) {
      const description = e.target.value

      this.setState((prevState) => ({
         currentJournal: {
            ...prevState.currentJournal,
            description: description,
         },
      }))
   }

   getJournal(id) {
      JournalDataService.get(id)
         .then((response) => {
            this.setState({
               currentJournal: response.data,
            })
            console.log(response.data)
         })
         .catch((e) => {
            console.log(e)
         })
   }

   updateJournal() {
      this.state.currentJournal.coordinates = getCoordinate()
      JournalDataService.update(this.state.currentJournal.id, this.state.currentJournal)
         .then((response) => {
            console.log(response.data)
            this.setState({
               message: "The log was updated successfully!",
            })
         })
         .catch((e) => {
            console.log(e)
         })
   }

   deleteJournal() {
      JournalDataService.delete(this.state.currentJournal.id)
         .then((response) => {
            console.log(response.data)
            this.props.history.push("/journals")
         })
         .catch((e) => {
            console.log(e)
         })
   }

   render() {
      const { currentJournal } = this.state
      return (
         <div class="two-columns-grid">
            <div>
               {currentJournal ? (
                  <div className="edit-form">
                     <h4>Your Information: </h4>
                     <form>
                        <div className="form-group">
                           <label htmlFor="title">Date</label>
                           <input type="date" className="form-control" id="title" value={currentJournal.title} onChange={this.onChangeTitle} />
                        </div>
                        <div className="form-group">
                           <label htmlFor="spot">Location</label>
                           <input type="text" className="form-control" id="spot" value={currentJournal.spot} onChange={this.onChangeSpot} />
                        </div>
                        <div className="form-group">
                           <label htmlFor="coord">Coordinates</label>
                           <input type="text" className="form-control" id="coord" required value={currentJournal.coordinates} onChange={this.onChangeCoordinate} name="coord" />
                        </div>
                        <div className="form-group">
                           <label htmlFor="size">Size</label>
                           <br />
                           <select id="size" required value={currentJournal.size} onChange={this.onChangeSize} name="size">
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
                           <input type="text" className="form-control" id="board" value={currentJournal.board} onChange={this.onChangeBoard} />
                        </div>
                        <div className="form-group">
                           <label htmlFor="description">Notes</label>
                           <input type="text" className="form-control" id="description" value={currentJournal.description} onChange={this.onChangeDescription} />
                        </div>
                     </form>
                     <h4>
                        <a href="/journals">
                           <button type="submit" className="badge badge-pill badge-info" style={{ background: "#0693E3" }} onClick={this.updateJournal}>
                              Update
                           </button>
                        </a>
                     </h4>
                     <h4>
                        <a href="/journals">
                           <button className="badge badge badge-pill mr-2" onClick={this.deleteJournal}>
                              Delete
                           </button>
                        </a>
                     </h4>
                     <p>{this.state.message}</p>
                  </div>
               ) : (
                  <div>
                     <br />
                     <p>Please click on a surf...</p>
                  </div>
               )}
            </div>
            <div>
               <Mapper />
            </div>
         </div>
      )
   }
}
