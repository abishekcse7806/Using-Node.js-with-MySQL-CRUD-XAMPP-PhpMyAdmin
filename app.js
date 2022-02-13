const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const Connection = require('mysql/lib/Connection')

const app = express()

//const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

const pool = mysql.createPool({
    host: 'localhost',
    user: 'iconic',
    password: 'abi123',
    database: 'iconic_digital'
})

//Get All Users

app.get('/', (req,res)=>{
    pool.getConnection((err, Connection)=> {
        if(err) throw err
        console.log('connected as id ${connection.threadId}')

        Connection.query('SELECT * from users',(err, rows, )=>{
          //  Connection.release()
            if(!err){
                res.send(rows)
            } else {
                console.log(err)
            }
        })


    })

})

// Get Students by ID

app.get('/:id', (req,res)=>{
    pool.getConnection((err, Connection)=> {
        if(err) throw err

        Connection.query('SELECT * from users WHERE id=?',[req.params.id],(err, rows, )=>{
          //  Connection.release()
            if(!err){
                res.send(rows)
            } else {
                console.log(err)
            }
        })


    })

})

//DELETE by ID

app.delete('/:id', (req,res)=>{
    pool.getConnection((err, Connection)=> {
        if(err) throw err

        Connection.query('DELETE * from users WHERE id=?',[req.params.id],(err, rows, )=>{
          //  Connection.release()
            if(!err){
                res.send(rows)
            } else {
                console.log(err)
            }
        })


    })

})

// INSERT 

app.delete('/', (req,res)=>{
    pool.getConnection((err, Connection)=> {
        if(err) throw err

        const params = req.body

        Connection.query('INSERT INTO users SET?',params,(err, rows)=>{
          //  Connection.release()
            if(!err){
                res.send(rows)
            } else {
                console.log(err)
            }
        })


    })

})

// UPDATE

app.delete('/', (req,res)=>{
    pool.getConnection((err, Connection)=> {
        if(err) throw err

        

        const {name, id } = req.body

        Connection.query('UPDATE users SET name = ?, id = ? WHERE id = ?',[name, id],(err, rows)=>{
          //  Connection.release()
            if(!err){
                res.send(rows)
            } else {
                console.log(err)
            }
        })


    })

})


app.listen(5000)