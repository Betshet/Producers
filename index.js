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

//Get the clients from database
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
            table: JSON.stringify(result)
        }));
        
	});
	
	con.end();
	
	return res;
});

//Add a client to the database
app.post('/addClient/', function(req, res) {
  
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  
  // Récupération des éléments du formulaire
  var firstname = req.body.firstname;
  var surname = req.body.surname;
  var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  var comments = req.body.comments;
  var producer = req.body.IdProducer;
    
  // Connexion à la base de données
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

  // Insertion dans la base consumer
  var sql = "INSERT INTO consumer (surname, firstname, email, phone, producer) VALUES (?)";
  var values = [surname, firstname, email, phone, producer];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  
    // Récupération de l'id du nouveau consumer
    var sql2 = "SELECT idConsumer FROM consumer WHERE surname = ? and firstname = ? and email = ? and phone = ? and producer = ?";
    var values2 = [surname];
    var values3 = [firstname];
    var values4 = [email];
    var values5 = [phone];
    var values6 = [producer];
    con.query(sql2, [values2, values3, values4, values5, values6], function (err2, result2) {
      console.log(err2);
      console.log(result2[0].idConsumer);

      // insertion dans la base consumerAddress
      var sql3 = "INSERT INTO consumerAddress (address, comments, idConsumer) VALUES (?)";
      var values7 = [address, comments, result2[0].idConsumer];
      con.query(sql3, [values7], function (err3, result3) {
        console.log(err3);
        console.log("1 record inserted");
      
        //fermeture de la connexion
        con.end();
      });
    });
  });
  
  return res.redirect('http://localhost:8080/ManageClients.html');
  
});