//details component
//using the JournalDataService methods get, update, and delete
import React, { Component } from "react";
import JournalDataService from "../services/journal.service";

export default class Journal extends Component {
   constructor(props) {
      super(props);
      this.onChangeTitle = this.onChangeTitle.bind(this);
      this.onChangeSpot = this.onChangeSpot.bind(this);
      this.onChangeSize = this.onChangeSize.bind(this);
      this.onChangeBoard = this.onChangeBoard.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.getJournal = this.getJournal.bind(this);
      this.updateJournal = this.updateJournal.bind(this);
      this.deleteJournal = this.deleteJournal.bind(this);

      this.state = {
         currentJournal: {
            id: null,
            title: "",
            spot: "",
            size: "",
            board: "",
            description: "",
         },
         message: "",
      };
   }

   //to fetch the data from the web API
   componentDidMount() {
      this.getJournal(this.props.match.params.id);
   }

   onChangeTitle(e) {
      const title = e.target.value;

      this.setState(function (prevState) {
         return {
            currentJournal: {
               ...prevState.currentJournal,
               title: title,
            },
         };
      });
   }

   onChangeSpot(e) {
      const spot = e.target.value;

      this.setState((prevState) => ({
         currentJournal: {
            ...prevState.currentJournal,
            spot: spot,
         },
      }));
   }

   onChangeSize(e) {
      const size = e.target.value;

      this.setState((prevState) => ({
         currentJournal: {
            ...prevState.currentJournal,
            size: size,
         },
      }));
   }

   onChangeBoard(e) {
      const board = e.target.value;

      this.setState((prevState) => ({
         currentJournal: {
            ...prevState.currentJournal,
            board: board,
         },
      }));
   }

   onChangeDescription(e) {
      const description = e.target.value;

      this.setState((prevState) => ({
         currentJournal: {
            ...prevState.currentJournal,
            description: description,
         },
      }));
   }

   getJournal(id) {
      JournalDataService.get(id)
         .then((response) => {
            this.setState({
               currentJournal: response.data,
            });
            console.log(response.data);
         })
         .catch((e) => {
            console.log(e);
         });
   }

   updateJournal() {
      JournalDataService.update(this.state.currentJournal.id, this.state.currentJournal)
         .then((response) => {
            console.log(response.data);
            this.setState({
               message: "The log was updated successfully!",
            });
         })
         .catch((e) => {
            console.log(e);
         });
   }

   deleteJournal() {
      JournalDataService.delete(this.state.currentJournal.id)
         .then((response) => {
            console.log(response.data);
            this.props.history.push("/journals");
         })
         .catch((e) => {
            console.log(e);
         });
   }

   render() {
      const { currentJournal } = this.state;

      return (
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
                     <button type="submit" className="badge badge-success" onClick={this.updateJournal}>
                        Update
                     </button>
                  </h4>
                  <h4>
                     <button className="badge badge-danger mr-2" onClick={this.deleteJournal}>
                        Delete
                     </button>
                  </h4>
                  <h4>
                     <a className="badge badge-warning" href="/journals">
                        View all logs
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
      );
   }
}
