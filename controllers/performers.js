const Performer = require('../models/performer');
const Movie = require('../models/movie');

module.exports = {
  new: newPerformer,
  create,
  addToCast
};

function addToCast(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    movie.cast.push(req.body.performerId);
    movie.save(function(err) {
      res.redirect(`/movies/${movie._id}`);
    });
  });
}

function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  // Fix by either reformatting to "MM-DD-YYYY" or by 
  // appending a "time" fragment like this... 
  req.body.born += 'T00:00';
  Performer.create(req.body, function (err, performer) {
    res.redirect('/performers/new');
  });
}

function newPerformer(req, res) {
  Performer.find({})
    //Sort performers by their name
    .sort('name')
    .exec(function (err, performers) {
      res.render('performers/new', {
        title: 'Add Performer',
        performers
      });
    });
}