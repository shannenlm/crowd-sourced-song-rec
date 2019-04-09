var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var fs = require('fs');
var dataUtil = require("./data-util");
var _ = require("underscore");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: require('./handlebars-helpers')
}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

dataUtil.restoreOriginalData();

var _DATA = dataUtil.loadData().songs;

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

 
app.get("/", function (req, res) {
  res.render('home', {
    data: _DATA
  });
});

app.get("/create", function (req, res) {
  res.render('create', {});
});

app.post('/create', function (req, res) {
  var body = req.body;

  // Transform tags and content
  body.artists = body.artists.split(",");
  body.artists = body.artists.map(s => s.trim());

  body.genres = body.genres.split(",");
  body.genres = body.genres.map(s => s.trim());

  body.suggested = 1;
  body.rank = parseInt(body.rank);

  // if song does not exist, create it.
  // else, add 1 to the amount of times the song has been suggested
  var _song = _.findWhere(_DATA, {
    title: body.title
  });

  if (!_song) {
    _DATA.push(req.body);
  } else {
    var same = false;

    for (var i in body.artists) {
      if ((_song.artists).includes(body.artists[i])) {
        same = true;
      } else {
        same = false;
      }
    }

    if (same) {
      _song.suggested = _song.suggested + 1;
      _song.rank = _song.rank + body.rank;
    } else {
      _DATA.push(req.body);
    }
  }

  // Save the changes made
  dataUtil.saveData(_DATA);
  res.redirect("/");
});

app.post("/api/create", function (req, res) {
  var body = req.body;

  body.suggested = 1;

  // if song does not exist, create it.
  // else, add 1 to the amount of times the song has been suggested
  var _song = _.findWhere(_DATA, {
    title: body.title
  });

  if (!_song) {
    _DATA.push(req.body);
  } else {
    var same = false;

    for (var i in body.artists) {
      if ((_song.artists).includes(body.artists[i])) {
        same = true;
      } else {
        same = false;
      }
    }

    if (same) {
      _song.suggested = _song.suggested + 1;
      _song.rank = _song.rank + body.rank;
    } else {
      _DATA.push(req.body);
    }
  }

  // Save data
  dataUtil.saveData(_DATA);
  res.redirect("/");
});

app.get("/api/getSongs", function (req, res) {
  res.send(_DATA);
});

app.get("/bestsongs", function(req, res) { 
  res.render('bestsongs', {
    data: _DATA
  });
});

app.get("/english", function(req, res) { 
  res.render('english', {
    data: _DATA
  });
});

app.get("/alphabetical", function(req, res) { 
  res.render('alphabetically', {
    data: _DATA
  });
});

app.get("/randomrec", function(req, res) { 
  res.render('randomrec', {
    data: _DATA
  });
});

app.get("/bygenre", function(req, res) { 
  res.render('bygenre', {
    data: _DATA
  });
});

/*app.listen(3000, function () {
  console.log('Listening on port 3000!');
}); */

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});
