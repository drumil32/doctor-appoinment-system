const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// dotenv config
dotenv.config()

// rest object
const app = express();

// middlewates
app.use(express.json());
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.send('abc');
});

// port
const PORT = process.env.PORT || 8080

// listen port
app.listen(PORT, () => {
    console.log('server is litening', PORT, process.env.NODE_MODE);
})