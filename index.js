var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var three = require('three');
var events = require('events');
var mysql = require('mysql');
var path    = require("path");

app.use(express.static(__dirname + '/public'));
app.use(express.static('Data'));

app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var types = [
  {
    title: "producteurs",
    description: "Execute C++ executable as a child process, using command " +
                 "line args and stdout.  Based on /cpp/standalone_stdio"
  }
];


var server = app.listen(3000, function () {
  console.log('Web server listing at http://localhost:%s', server.address().port);
  console.log(server);
});

app.get( '/', function (req,res) {
	console.log('hi');
	return res;
});

//Get the requested table from database
app.get( '/getTable', function (req,res) {
	
	var con = mysql.createConnection({
        host: "localhost",
		port: "3306",
        user: "root",
        password: "",
        database: "database"
    });
	
	con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    })
	
	var sql = "SELECT * FROM "+req.query.p1;
	con.query(sql, function (err, result) {
        if (err) throw err;
		res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify({
            status: 'OK',
            message: 'Data getted',
            rows: JSON.stringify(result)
        }));
        
	});
	
	con.end();
	
	return res;
});

//Get the requested rows from the requested table with the given value
app.get( '/getRows', function (req,res) {
	
	var con = mysql.createConnection({
        host: "localhost",
		port: "3306",
        user: "root",
        password: "",
        database: "database"
    });
	
	con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    })
	
	var sql = "SELECT * FROM "+req.query.p1+" WHERE "+req.query.p2+" = \'"+req.query.p3+"\'";
	con.query(sql, function (err, result) {
        if (err) throw err;
		res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify({
            status: 'OK',
            message: 'Data getted',
            rows: JSON.stringify(result)
        }));
        
	});
	
	con.end();
	
	return res;
});
