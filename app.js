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

//rutas
//creamos los endpoint
app.get('/', (req, res)=>{
    res.send('Welcome to my API! ESTE ES EL PRIMER GET REALIZADO POR MI')
});

//simularemos un crud aqui
//1er listado de todos los clientes 
app.get('/customers', (req, res)=>{
    const sql = 'SELECT * FROM customers';
    connection.query(sql, (error, results)=>{
        if(error) throw error;
        if(results.length>0){
            res.json(results);
        } else {
            res.send('Not result');
        }
    });
    // res.send('List of Customers');
});
app.get('/customers/:id', (req, res)=>{
    const{id} = req.params
    const sql =`SELECT * FROM customers WHERE id = ${id}`;
    connection.query(sql, (error, result)=>{
        if(error) throw error;
        if(result.length>0){
            res.json(result);
        } else {
            res.send('Not result');
        }
    })
    // res.send('Get customers by id');
});
app.post('/add', (req, res)=>{
    const sql =`INSERT INTO customers SET ?`;
    const customersObj = {
        name: req.body.name,
        city: req.body.city
    }
    connection.query(sql, customersObj, error =>{
        if(error) throw error;
        res.send('Customer Created!');
    });
    // res.send('New customer');
});
app.put('/update/:id', (req,res)=>{
    res.send('Update customers')
});
app.delete('/delete/:id', (req, res)=>{
    res.send('Delete customer')
})


//check Connect
connection.connect(error=>{
    if(error) throw error;
    console.log('DataBase server running!');
});

app.listen(PORT, ()=>{console.log(`SERVER RUNNING ON PORT ${PORT}`);})