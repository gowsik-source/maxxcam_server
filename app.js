const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require("dotenv").config();
const mongodbUrl = process.env.mongodb_url;
const port = 3200;

const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const productCategoryRoute = require('./routes/productCategoryRoute');

const corsOptions = {
    origin:"*",
    Credentials:true,
    OptionSuccessStatus:200
};

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));

app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/product-category', productCategoryRoute);

app.get('/', (req, res) => {
    res.send("Backend is running");
});

// mongoose.connect('mongodb://localhost:27017/maxxcam')
mongoose.connect(mongodbUrl)
.then(() => console.log('Database connected'))
.catch(error => console.log(error));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});