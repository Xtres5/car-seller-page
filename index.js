const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const carRouter =  require('./routes/upload');
const postRouter =  require('./routes/post');

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection was successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Atlas connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

app.get('/', (req, res) => {
  res.render('index'); // Render the index.ejs file in the "views" folder
});

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use('/', registerRouter);
app.use('/', loginRouter);
app.use('/', carRouter);
app.use('/', postRouter);


// Set the view engine to EJS
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});