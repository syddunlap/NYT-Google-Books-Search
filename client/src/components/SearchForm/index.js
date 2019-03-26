import React from "react";
import "./style.css";

function SearchForm(props) {
  return (
    <form className="search">
      <div className="form-group">
        <label htmlFor="title"></label>
        <input
          value={props.search}
          onChange={props.handleInputChange}
          name="title"
          list="titles"
          type="text"
          className="form-control"
          placeholder="Type Book Title Here"
          id="title"
        />
        <button type="submit" onClick={props.handleFormSubmit} className="btn btn-success">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
