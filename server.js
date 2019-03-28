const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const routes = require("./controllers/booksController");
const app = express();

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", { useNewUrlParser: true });

// Start the API Server
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
