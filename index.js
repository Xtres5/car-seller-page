const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const crypto = require('crypto');
const passport = require('./routes/passport');

const app = express();

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

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(session({
  secret: crypto.randomBytes(32).toString('hex'),
  resave: false, 
  saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

const homeRouter = require('./routes/home');
app.use('/', homeRouter);
const profileRouter = require('./routes/profile');
app.use('/', profileRouter);
const registerRouter = require('./routes/register');
app.use('/', registerRouter);
const loginRouter = require('./routes/login');
app.use('/', loginRouter);
const logoutRouter = require('./routes/logout');
app.use('/', logoutRouter);
const carRouter =  require('./routes/upload');
app.use('/', carRouter);
const postRouter =  require('./routes/post');
app.use('/', postRouter);



// Set the view engine to EJS
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});