const express = require('express');
const {blogsRouter} = require('./Routes/blogsRoute');
const {usersRouter} = require('./Routes/usersRoute');

const app = express();
app.use(express.json());
require('dotenv').config();

app.use('/blogs',blogsRouter);
app.use('/users',usersRouter);

app.get('/', (req,res) => {
    res.status(200).send('Got /');
});


let port = process.env.WEB_SERVER_PORT || 8000 ;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

