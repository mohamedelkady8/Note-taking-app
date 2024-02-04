// Description: Main file of the project

// express
const express = require('express');
const app = express();

//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connection to MongoDB
require("./connection/mongoose");

// cors
const cors = require('cors');
app.use(cors());

// static files
app.use(express.static('public'));

// routes
const User = require("./routes/user");
const Note = require("./routes/note");
app.use("/users", User);
app.use("/notes", Note);

// End points for HTML pages
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/about.html');
});

// port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});