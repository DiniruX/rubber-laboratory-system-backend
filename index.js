const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 8000;
const DB_URL = 'mongodb+srv://admin:admin@rubberlaboratory.gnbffxo.mongodb.net/?retryWrites=true&w=majority';
const app = express();

//import routes
const userRoutes = require('./Routes/UserRoutes');
const testRoutes = require('./Routes/TestRoutes');
const orderRoutes = require('./Routes/OrderRoutes');

app.use(cors({

    origin: "*",
}));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//use routes
app.use("/user", userRoutes);
app.use("/tests", testRoutes);
app.use("/orders", orderRoutes);

mongoose.connect(DB_URL, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {

    console.log("Database Connected Successfully...");
})
.catch((err) => {

    console.log("Database Connection Failed!!!", err);
})

app.listen(PORT, () => {

    console.log(`The Application is running on port ${PORT}`);
})