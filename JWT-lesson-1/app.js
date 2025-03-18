const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())

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
app.use(authRoutes)