/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.locals.pretty = true;

// This is the middleware that parses a POST body to we can see the form fields.
// It is usually included as a default.
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', function (req, res) {
    res.render("index", {title: "form-example"});
});

// This is the view that is being invoked on form submit. It is responsible for
// working with the form data (which itself is residing in req.body).
// Look at views/index.jade to see how the template is being rendered
// differently if there has been a form submission.
app.post('/', function (req, res) {
    // here, you can do anything with the form data. Process it, save it to a
    // DB, you name it. I just log the req.body to console here (be sure to
    // view it once).
    console.log(req.body);
    res.render("index", {title: "form-example", name: req.body.name});
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
