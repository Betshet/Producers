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

var redirect = process.argv[2];
var dbport = process.argv[3];
var server = app.listen(3000, function () {
  console.log('Web server listing at http://localhost:%s', server.address().port);
  console.log(server);
});

//Get the requested table from database
app.get( '/getTable', function (req,res) {
	
	var con = mysql.createConnection({
        host: "localhost",
		port:dbport,
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
		port:dbport,
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
  var producer = req.body.producer;
    
  // Connexion à la base de données
  var con = mysql.createConnection({
    host: "localhost",
    port: dbport,
    user: "root",
    password: "",
    database: "database"
  });

  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  })

  // Insertion dans la base consumer
  var sql = "INSERT INTO consumer (surname, firstname, email, phone, idProducer) VALUES (?)";
  var values = [surname, firstname, email, phone, producer];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  
    // Récupération de l'id du nouveau consumer
    var sql2 = "SELECT idConsumer FROM consumer WHERE surname = ? and firstname = ? and email = ? and phone = ? and idProducer = ?";
    var values2 = [surname];
    var values3 = [firstname];
    var values4 = [email];
    var values5 = [phone];
    var values6 = [producer];
    con.query(sql2, [values2, values3, values4, values5, values6], function (err2, result2) {
      console.log(err2);
      console.log(result2[0].idConsumer);

      // insertion dans la base Address
      var sql3 = "INSERT INTO address (address, comments, idProducer, idConsumer) VALUES (?)";
      var values7 = [address, comments, 0,result2[0].idConsumer];
      con.query(sql3, [values7], function (err3, result3) {
        console.log(err3);
        console.log("1 record inserted");
      
        //fermeture de la connexion
        con.end();
      });
    });
  });
  
  return res.redirect(redirect+'ManageClients.html');
  
});

//Add a producer to the database
app.post('/addProducer/', function(req, res) {
  
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  
  // Récupération des éléments du formulaire
  var firstname = req.body.firstname;
  var surname = req.body.surname;
	var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  var comments = req.body.comments;
    
  // Connexion à la base de données
  var con = mysql.createConnection({
    host: "localhost",
    port: dbport,
    user: "root",
    password: "",
    database: "database"
  });

  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  })

  // Insertion dans la base producer
  var sql = "INSERT INTO producer (surname, firstname, email, phone) VALUES (?)";
  var values = [surname, firstname, email, phone];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  
    // Récupération de l'id du nouveau producer
    var sql2 = "SELECT idProducer FROM producer WHERE surname = ? and firstname = ? and email = ? and phone = ?";
    var values2 = [surname];
    var values3 = [firstname];
    var values4 = [email];
    var values5 = [phone];
    con.query(sql2, [values2, values3, values4, values5], function (err2, result2) {
      console.log(err2);
      console.log(result2[0].idProducer);

      // insertion dans la base producerAddress
      var sql3 = "INSERT INTO address (address, comments, idProducer, idConsumer) VALUES (?)";
      var values6 = [address, comments, result2[0].idProducer, 0];
      con.query(sql3, [values6], function (err3, result3) {
        console.log(err3);
        console.log("1 record inserted");
      
        //fermeture de la connexion
        con.end();
      });
    });
  });
  
  return res.redirect(redirect+'ManageProducers.html');
  
});


//Add a producer to the database, but from authentification
app.post('/addProducerAuth/', function(req, res) {
  
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  
  // Récupération des éléments du formulaire
  var firstname = req.body.firstname;
  var surname = req.body.surname;
	var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  var comments = req.body.comments;
    
  // Connexion à la base de données
  var con = mysql.createConnection({
    host: "localhost",
    port: dbport,
    user: "root",
    password: "",
    database: "database"
  });

  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  })

  // Insertion dans la base producer
  var sql = "INSERT INTO producer (surname, firstname, email, phone) VALUES (?)";
  var values = [surname, firstname, email, phone];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  
    // Récupération de l'id du nouveau producer
    var sql2 = "SELECT idProducer FROM producer WHERE surname = ? and firstname = ? and email = ? and phone = ?";
    var values2 = [surname];
    var values3 = [firstname];
    var values4 = [email];
    var values5 = [phone];
    con.query(sql2, [values2, values3, values4, values5], function (err2, result2) {
      console.log(err2);
      console.log(result2[0].idProducer);

      // insertion dans la base producerAddress
      var sql3 = "INSERT INTO address (address, comments, idProducer, idConsumer) VALUES (?)";
      var values6 = [address, comments, result2[0].idProducer, 0];
      con.query(sql3, [values6], function (err3, result3) {
        console.log(err3);
        console.log("1 record inserted");
      
        //fermeture de la connexion
        con.end();
      });
    });
  });
  
  return res.redirect(redirect+'Authentification.html');
  
});

//Add a truck to the database
app.post('/addTruck/', function(req, res) {
  
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  
  // Récupération des éléments du formulaire
  var capacity = req.body.capacity;
  var input = req.body.checkYes;
  var isRefregirated;
  if(input == 'true'){
    isRefregirated = 1;
  }
  else{
    isRefregirated = 0;
  }
  var producer = req.body.producer;
    
  // Connexion à la base de données
  var con = mysql.createConnection({
    host: "localhost",
    port: dbport,
    user: "root",
    password: "",
    database: "database"
  });

  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  })

  // Insertion dans la table truck
  var sql = "INSERT INTO vehicles (capacity, isRefregirated, idProducer) VALUES (?)";
  var values = [capacity, isRefregirated, producer];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
     
    //fermeture de la connexion
    con.end();
  });
    
  return res.redirect(redirect+'TruckList.html');
  
});

function jsDateToSql(sYear, sMonth, sDay, sHour, sMinute){
    //Change the parameters to SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
    var sqlDate = sYear + "-" + sMonth + "-" + sDay + " " + sHour + ":" + sMinute + ":00.00";

    return sqlDate;
}

//Add a delivery to the database
app.post('/addDelivery/', function(req, res) {
  
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  
  // Récupération des éléments du formulaire
  var quantity = req.body.quantity;
  var input = req.body.checkYes;
  var productsType;
  if(input == 'true'){
    productsType = 1;
  }
  else{
    productsType = 0;
  }
  var sYear = req.body.year;
  var sMonth = req.body.month;
  var sDay = req.body.day;
  var sHour = req.body.hour;
  var sMinute = req.body.minute;
  var consumer = req.body.consumer;
  var producer = req.body.producer;

  //Modification en DateTime pour la base de données
  var sqlDate = jsDateToSql(sYear, sMonth, sDay, sHour, sMinute);

  // Connexion à la base de données
  var con = mysql.createConnection({
    host: "localhost",
    port: dbport,
    user: "root",
    password: "",
    database: "database"
  });

  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  })

  // Insertion dans la table delivery
  var sql = "INSERT INTO delivery (quantity, productsType, deliveryHour, idProducer, idConsumer) VALUES (?)";
  var values = [quantity, productsType, sqlDate, producer, consumer];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
     
    //fermeture de la connexion
    con.end();
  });
    
  return res.redirect(redirect+'ManageDelivery.html');
  
});

app.post( '/deleteRow/', function (req,res) {
    res.setHeader('Content-Type', 'application/json');


  // Connexion à la base de données
  var con = mysql.createConnection({
    host: "localhost",
    port: dbport,
    user: "root",
    password: "",
    database: "database"
  });

  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  })
 
  var table = req.query.p1;
  var column = req.query.p2;
  var cell = req.query.p3;
	
  var sql = "DELETE FROM "+table+" WHERE "+column+" = "+cell;
  con.query(sql, function (err, result) {
        if (err) throw err;
  });
  
});

//Edit the information of a client in the database
app.post('/editClient/', function(req, res) {
  
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  
  // Récupération des éléments du formulaire
  var firstname = req.body.firstname;
  var surname = req.body.surname;
  var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  var comments = req.body.comments;
  var client = req.body.client;
    
  // Connexion à la base de données
  var con = mysql.createConnection({
    host: "localhost",
    port:dbport,
    user: "root",
    password: "",
    database: "database"
  });

  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  })

  // Modification de la table consumer
  var sql = "UPDATE consumer SET firstname = ? , surname = ? , email = ? , phone = ? WHERE idConsumer = ?";
  var values1 = [firstname];
  var values2 = [surname];
  var values3 = [email];
  var values4 = [phone];
  var values5 = [client];
  con.query(sql, [values1, values2, values3, values4, values5], function (err, result) {
    if (err) throw err;
    console.log("1 record modified");
  
    // Modification de l'adresse du client
    var sql2 = "UPDATE address SET address = ? , comments = ? WHERE idConsumer = ?";
    var values6 = [address];
    var values7 = [comments];
    var values8 = [client];
    con.query(sql2, [values6, values7, values8], function (err2, result2) {
      console.log(err2);

      console.log("1 record modified");
      
      //fermeture de la connexion
      con.end();
    });
  });
  
  return res.redirect(redirect+'ManageClients.html');
  
});

//Edit the information of a producer in the database
app.post('/editProducer/', function(req, res) {
  
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  
  // Récupération des éléments du formulaire
  var firstname = req.body.firstname;
  var surname = req.body.surname;
  var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  var comments = req.body.comments;
  var producer = req.body.producer;
    
  // Connexion à la base de données
  var con = mysql.createConnection({
    host: "localhost",
    port: dbport,
    user: "root",
    password: "",
    database: "database"
  });

  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  })

  // Modification de la table producer
  var sql = "UPDATE producer SET firstname = ? , surname = ? , email = ? , phone = ? WHERE idProducer = ?";
  var values1 = [firstname];
  var values2 = [surname];
  var values3 = [email];
  var values4 = [phone];
  var values5 = [producer];
  con.query(sql, [values1, values2, values3, values4, values5], function (err, result) {
    if (err) throw err;
    console.log("1 record modified");
  
    // Modification de l'adresse du producteur
    var sql2 = "UPDATE address SET address = ? , comments = ? WHERE idProducer = ?";
    var values6 = [address];
    var values7 = [comments];
    var values8 = [producer];
    con.query(sql2, [values6, values7, values8], function (err2, result2) {
      console.log(err2);

      console.log("1 record modified");
      
      //fermeture de la connexion
      con.end();
    });
  });
  
  return res.redirect(redirect+'ManageProducers.html');
  
});

//Edit the information of a truck in the database
app.post('/editTruck/', function(req, res) {
  
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  
  // Récupération des éléments du formulaire
  var capacity = req.body.capacity;
  var input = req.body.checkYes;
  var isRefregirated;
  if(input == 'true'){
    isRefregirated = 1;
  }
  else{
    isRefregirated = 0;
  }
  var truck = req.body.truck;
    
  // Connexion à la base de données
  var con = mysql.createConnection({
    host: "localhost",
    port: dbport,
    user: "root",
    password: "",
    database: "database"
  });

  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  })

  // Modification de la table truck
  var sql = "UPDATE vehicles SET capacity = ? , isRefregirated = ? WHERE idVehicles = ?";
  var values1 = [capacity];
  var values2 = [isRefregirated];
  var values3 = [truck];
  con.query(sql, [values1, values2, values3], function (err2, result2) {
    if (err) throw err;
    console.log("1 record Modified");
     
    //fermeture de la connexion
    con.end();
  });
    
  return res.redirect(redirect+'TruckList.html');
  
});

//Edit a delivery from the database
app.post('/editDelivery/', function(req, res) {
  
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  
  // Récupération des éléments du formulaire
  var quantity = req.body.quantity;
  var input = req.body.checkYes;
  var productsType;
  if(input == 'true'){
    productsType = 1;
  }
  else{
    productsType = 0;
  }
  var sYear = req.body.year;
  var sMonth = req.body.month;
  var sDay = req.body.day;
  var sHour = req.body.hour;
  var sMinute = req.body.minute;
  var consumer = req.body.consumer;
  var delivery = req.body.delivery;

  //Modification en DateTime pour la base de données
  var sqlDate = jsDateToSql(sYear, sMonth, sDay, sHour, sMinute);

  // Connexion à la base de données
  var con = mysql.createConnection({
    host: "localhost",
    port: dbport,
    user: "root",
    password: "",
    database: "database"
  });

  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  })

  // Insertion dans la table delivery
  var sql = "UPDATE delivery SET quantity = ? , productsType = ? , deliveryHour = ? , idConsumer = ? WHERE idDelivery = ?";
  var values1 = [quantity];
  var values2 = [productsType];
  var values3 = [sqlDate];
  var values4 = [consumer];
  var values5 = [delivery];
  con.query(sql, [values1, values2, values3, values4, values5], function (err, result) {
    if (err) throw err;
    console.log("1 record Modified");
     
    //fermeture de la connexion
    con.end();
  });
    
  return res.redirect(redirect+'ManageDelivery.html');
  
});