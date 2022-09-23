//create component for front page that displays....
//search bar for finding the journals by date of surf
//an array of all surfs
//the journal information once it is selected
import React, { Component } from "react";
import JournalDataService from "../services/journal.service";
import { Link } from "react-router-dom";

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
      super(props);
      this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
      this.retrieveJournals = this.retrieveJournals.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.setActiveJournal = this.setActiveJournal.bind(this);
      this.removeAllJournals = this.removeAllJournals.bind(this);
      this.searchTitle = this.searchTitle.bind(this);

      this.state = {
         journals: [],
         currentJournal: null,
         currentIndex: -1,
         searchTitle: "",
      };
   }

   componentDidMount() {
      this.retrieveJournals();
   }

   onChangeSearchTitle(e) {
      const searchTitle = e.target.value;

      this.setState({
         searchTitle: searchTitle,
      });
   }

   retrieveJournals() {
      JournalDataService.getAll()
         .then((response) => {
            this.setState({
               journals: response.data,
            });
            console.log(response.data);
         })
         .catch((e) => {
            console.log(e);
         });
   }

   refreshList() {
      this.retrieveJournals();
      this.setState({
         currentJournal: null,
         currentIndex: -1,
      });
   }

   setActiveJournal(journal, index) {
      this.setState({
         currentJournal: journal,
         currentIndex: index,
      });
   }

   removeAllJournals() {
      JournalDataService.deleteAll()
         .then((response) => {
            console.log(response.data);
            this.refreshList();
         })
         .catch((e) => {
            console.log(e);
         });
   }

   searchTitle() {
      JournalDataService.findByTitle(this.state.searchTitle)
         .then((response) => {
            this.setState({
               journals: response.data,
            });
            console.log(response.data);
         })
         .catch((e) => {
            console.log(e);
         });
   }

   render() {
      const { searchTitle, journals, currentJournal, currentIndex } = this.state;
      //functionality if you click on any edit button on any journals
      //will direct to journal page and the ability to delete or update it
      //use React Router link for accessing that page with the URL /journals/:id
      return (
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
               <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllJournals}>
                  Remove All
               </button>
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

                     <Link to={"/journals/" + currentJournal.id} className="badge badge-warning">
                        Edit
                     </Link>
                  </div>
               ) : (
                  <div>
                     <br />
                     <h5>
                        <a className="badge badge-warning" href="/journals">
                           View all logs
                        </a>
                     </h5>
                     <p>Please click on a surf to edit, update, or look back through the journal!</p>
                  </div>
               )}
            </div>
         </div>
      );
   }
}
