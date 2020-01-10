# Producers
 

Producers is a project helping the mutualization of producers by generating plannings based on the information provided.

## Authors

Romain BACHELIER
Adrien VERDIER

## Installation

To run this project, you need to have NodeJS installed, and to create and run a MySQL database using the file "database.sql". You also need to host the project on an HTTP server.
Make sure that the user "root" of your database server doesn't have a password, or enter the password yourself in the "con.password" variable of index.js.

Run the file "index.js" by opening a command prompt in the directory and typing :
```bash
node index.js [URL of your HTTP server] [Port of your MySQL database server]
```

For example : 
```bash
node index.js http://localhost:8000/ 3303
```

/!\ Don't forget the '/' at the end of your URL! /!\

## Usage

Open the 'Authentification' page to begin navigating the interface. You can create a new producer account, enter the email of an existing account, or log in as 'admin' to get admin privileges.
