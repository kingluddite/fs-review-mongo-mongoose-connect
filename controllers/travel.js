/* GET travel view */
//var fs = require('fs');
//var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// fs allows accsess to the file system of the web server
const fs = require('fs')
// when read it returns a string that gets passed to a json object with parse method, returning an object
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'))
// console.log(trips)
// FIXME

const travel = (req, res) => {
  console.log('the travel in the controller has been reached')
  res.render('travel', { title: 'Travlr Getaways', trips }) // this will pass in the page title and trips
}
module.exports = {
  travel,
}
