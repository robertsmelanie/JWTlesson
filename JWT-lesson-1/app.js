const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const cookieParser = require ('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://melrobiphone:bPyn3fbzMN2vRUx2@cluster1.15wtx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));

app.get('/smoothies', (req, res) => res.render('smoothies'));

// app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-cookie',
  //   'newUser=true');

//   res.cookie('newUser', false)
//   res.cookie('isEmployee', true, {maxAge:1000 * 60 * 24, httpOnly:true})
//   res.send('You got the cookies, check the application tab in the inspect tool')
  
// })
// app.get('/read-cookies', (req, res) => {
  
//   const cookies = req.cookies;
//   console.log(cookies.newUser)

//   res.json(cookies)
// })


app.use(authRoutes)