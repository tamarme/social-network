const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

// env
require('dotenv').config();

// database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('db connected'))
    .catch(error => console.log(error))

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(expressValidator());
app.use(express.json());

// routes
const signup = require('./routes/auth');
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');

app.use('/', signup);
app.use('/users', usersRoute);
app.use('/posts', postsRoute);

// server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`API is listening on port: ${PORT}`)
});
