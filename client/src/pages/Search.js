import React, { Component } from "react";
import API from "../utils/API";
import Card from "../components/Card";
import Col from "../components/Col";
import Row from "../components/Row";
import Container from "../components/Container";
import List from "../components/List";
import SearchForm from "../components/SearchForm";

class Search extends Component {
  state = {
    books: [],
    q: "",
    message: "Enter a Book Title To Search!"
  };

  // Method to change the value of what is being typed in the form
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Method to handle the when the form is submitted or "Search" is pressed.
  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks();
  };

  // Method for when the "Search" Button is clicked & also after a book is saved
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

  // Method for when the "Save" Button is clicked
  saveBook = id => {
    const book = this.state.books.find(book => book.id === id);
    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getBooks());
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
              <Card title="Results">
                {this.state.books.length ? (
                  <List>
                    {this.state.books.map(book => (
                      <Book
                        key={book.id}
                        title={book.volumeInfo.title}
                        link={book.volumeInfo.infoLink}
                        authors={book.volumeInfo.authors.join(", ")}
                        description={book.volumeInfo.description}
                        image={book.volumeInfo.imageLinks.thumbnail}
                        Button={() => (
                          <button
                            onClick={() => this.saveBook(book.id)}
                            className="btn btn-primary ml-2"
                          >
                            Save
                        </button>
                        )}
                      />
                    ))}
                  </List>
                ) : (
                    <h2 className="text-center">{this.state.message}</h2>
                  )}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Search;
