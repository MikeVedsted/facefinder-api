const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-curved-56381',
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_DATABASE
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {res.send(db.users)})
app.post('/signin', (req, res) => {signin.handSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) =>  {profile.handleProlieGet(res, res, db)})
app.put('/image', (req, res) => {image.handleImage(res, req, db)})



app.listen(PORT, ()=> {
  console.log('app is running on');
})