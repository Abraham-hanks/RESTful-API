const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config')

const app = express();

if(process.env.ENV === 'Test'){ 
    console.log(" This is a Test")
}
else{
    const db = mongoose.connect(process.env.DB_URL, 
        { useNewUrlParser: true, useUnifiedTopology: true},
        (err, connection) =>{
            if(err){
                console.log(err)
            }
            else{
                console.log('Successfully connected')
            }
        }
    )
}
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/dev.api/v1', bookRouter);

app.get('/', (req, res) => {
    res.send('welcome to my api')
})

app.server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

module.exports = app;
