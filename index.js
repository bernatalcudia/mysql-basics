const PORT = 8000

const { error } = require('console')
const cors = require('cors')

const express = require('express')

const mysql2 = require('mysql2')

const app = express()

app.use(cors())
app.use(express.json())


const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
})

const sql = 'CREATE DATABASE testNode'


db.connect()

db.query(sql, (error, result) => {
    if (error) console.log(error);
    console.log(result)
})