const express = require('express');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');

const app = express();
connectDB();  //access config/db to connect to mongo

//middleware
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'react-client', 'build')))
app.use(express.json({extended: false})); //allows us to get data from req.body
app.use(cors());

//default endpoint
app.get('/', (req, res) => {
  res.send('this gonna be a dope quote apppppp');
})

//define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/quotes', require('./routes/api/quotes'))


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,'react-client','build', 'index.html'))
})

//listener
app.listen(PORT, () => {
  console.log(`it\'s lit on ${PORT}`);
})