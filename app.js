const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

//mysql

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'1234',
    database:'node20_mysql'    
});


//check Connect
connection.connect(error=>{
    if(error) throw error;
    console.log('DataBase server running!');
});

app.listen(PORT, ()=>{console.log(`SERVER RUNNING ON PORT ${PORT}`);})