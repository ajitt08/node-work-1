const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentyear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  text.toUpperCase();
})

app.set('view engine', 'hbs');

app.use(express.static(__dirname+'/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unable');
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    MaintenanceMsg: 'Site is under Maintenance Mode!'
  });
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Andrew',
  //   likes: [
  //     'Biking',
  //     'Cycling'
  //   ]
  // })

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to Home Page'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'We are sorry! Something went bad.'
  })
});

app.listen(3000);
