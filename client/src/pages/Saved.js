import React, { Component } from "react";
import Card from "../components/Card";
import Book from "../components/Book";
import API from "../utils/API";
import Col from "../components/Col";
import Row from "../components/Row";
import Container from "../components/Container";
import { List } from "../components/List";

class Saved extends Component {
    state = {
        books: []
    };

    componentDidMount() {
        this.getSavedBooks();
    };

    getSavedBooks = () => {
        API.getSavedBooks()
            .then(res =>
                this.setState({
                    books: res.data
                })
            )
            .catch(err => console.log(err));
    };

    handleBookDelete = id => {
        API.deleteBook(id).then(res => this.getSavedBooks());
    };

    render() {
        return (
            <Container>
                <Row>
                    <strong>(React) Google Books Search</strong>
                    <h1 className="text-center">Search for and Save Books of Interest</h1>
                </Row>
                <Row>
                    <Col size="md-12">
                        <Card title="Saved Books">
                            {this.state.books.length ? (
                                <List>
                                    {this.state.books.map(book => (
                                        <Book
                                            key={book._id}
                                            title={book.title}
                                            link={book.link}
                                            authors={book.authors.join(", ")}
                                            description={book.description}
                                            image={book.image}
                                            Button={() => (
                                                <button
                                                    onClick={() => this.handleBookDelete(book._id)}
                                                    className="btn btn-danger ml-2"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        />
                                    ))}
                                </List>
                            ) : (
                                    <h2 className="text-center">No Books Saved</h2>
                                )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Saved;