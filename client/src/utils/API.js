import axios from "axios";

// Export an object containing methods we'll use for accessing the Google & Books API

export default {
    // Gets books from the Google API
    getBooks: function(q) {
        return axios.get("/api/google", { params: { q: "intitle:" + q }});
    },
    // Get all saved books from database
    getSavedBooks: function() {
        return axios.get("/api/books");
    },
    // Delete a saved book using the id
    deleteBook: function(id) {
        return axios.delete("api/books/" + id);
    },
    // Save a book to the database
    saveBook: function(bookData) {
        return axios.post("api/books", bookData);
    }
};

