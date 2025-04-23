const PORT = 8000
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()
app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'testnode'
})
db.connect()

let sqlQuery = ''





app.get('/cities', (req, res) => {
    sqlQuery = 'SELECT * from cities'
    db.query(sqlQuery, (err, result) => {
        if (err) throw err
        res.send(result)

    })
})

app.post('/cities', (req, res) => {
    const cityName = req.body.city
    const country = req.body.country
    sqlQuery = `INSERT INTO cities (name,country) values  ('${cityName} ', '${country} ');`;
    db.query(sqlQuery, (err, result) => {
        if (err) throw err
        res.send('City added')
    })
})

app.delete('/cities/:id', (req, res) => {
    const cityID = req.params.id
    sqlQuery = `DELETE from cities WHERE id=${cityID}`
    db.query(sqlQuery, (err, result) => {
        if (err) throw err
        if (result.affectedRows > 0) {
            res.send('City deleted')
        } else {
            res.status(404).send('City not found')
        }

    })
})

app.listen(PORT, () => {
    console.log(`Server boot in Port:${PORT}`)
})