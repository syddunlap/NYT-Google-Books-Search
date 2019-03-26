import React, { Component } from "react";
import API from "../utils/API";
import Card from "../components/Card";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";

class Search extends Component {
  state = {
    books: [],
    q: "",
    message: "Enter a Book Title To Search!"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks();
  }

  getBooks = () => {
    API.getBooks(this.state.q)
    .then(res => 
      this.setState({
        books: res.data
      })
    )
    .catch(() =>
      this.setState({
        books: [],
        message: "No Books Found, Try Again."
      })
    );
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <strong>(React) Google Books Search</strong>
          <h1 className="text-center">Search for and Save Books of Interest</h1>
          </Row>
          <Row>
            <Col size="md-12">
              <Card title="Search Form">
                <SearchForm
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit}
                  q={this.state.q}
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              <Card title="Search Results">
              
              </Card>
            </Col>
          </Row>


        </Container>
      </div>
    );
  }
}

export default Search;
