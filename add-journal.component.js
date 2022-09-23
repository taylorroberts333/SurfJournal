//create components that correspond to the routes defined in App.js
//also functions to get value from state
//send the POST request to the web API
import React, { Component } from "react";
import JournalDataService from "../services/journal.service";

//get todays date to add to title
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();
//refactor today for use
today = mm + "/" + dd + "/" + yyyy;

export default class AddJournal extends Component {
   //define constructor and set the initial state to this for all events
   constructor(props) {
      super(props);
      this.onChangeTitle = this.onChangeTitle.bind(this);
      this.onChangeSpot = this.onChangeSpot.bind(this);
      this.onChangeSize = this.onChangeSize.bind(this);
      this.onChangeBoard = this.onChangeBoard.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.saveJournal = this.saveJournal.bind(this);
      this.newJournal = this.newJournal.bind(this);

      this.state = {
         id: null,
         //add todays date
         title: today,
         spot: "",
         size: "",
         board: "",
         description: "",

         submitted: false,
      };
   }

   //for all fields of input set the state for changes
   onChangeTitle(e) {
      this.setState({
         //user can change day if needed to add previous days
         title: e.target.value,
      });
   }

   onChangeSpot(e) {
      this.setState({
         spot: e.target.value,
      });
   }

   onChangeSize(e) {
      this.setState({
         size: e.target.value,
      });
   }

   onChangeBoard(e) {
      this.setState({
         board: e.target.value,
      });
   }

   onChangeDescription(e) {
      this.setState({
         description: e.target.value,
      });
   }

   saveJournal() {
      var data = {
         title: this.state.title,
         spot: this.state.spot,
         size: this.state.size,
         board: this.state.board,
         description: this.state.description,
      };

      JournalDataService.create(data)
         .then((response) => {
            this.setState({
               id: response.data.id,
               title: response.data.title,
               spot: response.data.spot,
               size: response.data.size,
               board: response.data.board,
               description: response.data.description,

               submitted: true,
            });
            console.log(response.data);
         })
         .catch((e) => {
            console.log(e);
         });
   }

   newJournal() {
      this.setState({
         id: null,
         title: today,
         spot: "",
         size: "",
         board: "",
         description: "",

         submitted: false,
      });
   }

   render() {
      //check the submitted state
      //if true show add button for creating another journal
      return (
         <div className="submit-form">
            {this.state.submitted ? (
               <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={this.newJournal}>
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

                  <button onClick={this.saveJournal} className="btn btn-success">
                     Submit
                  </button>
               </div>
            )}
         </div>
      );
   }
}
