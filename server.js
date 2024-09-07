const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const cors = require('cors')
const compression = require('compression')

// Routes







const Restaurant=require('./routes/restaurant')
const Food=require('./routes/Food')
const Category=require('./routes/category')
const Rating=require('./routes/rating')
const User=require('./routes/authuser');
const Cart=require('./routes/cart');
const Order=require('./routes/order');
const Vole=require('./routes/vole');










// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());


app.use(cors())
app.options('*', cors())

 //tcomperi les fichiers
app.use(compression())


//tkhademlek file hetha 
app.use(express.static(path.join(__dirname, 'uploads')));



if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}












     



 




app.get('/api/s', (req,res)=>{
  console.log(2);
  res.send("dzdzdz")
}
);


// Mount Routes
app.use('/api/Vole', Vole);

app.use('/api/restaurants', Restaurant);
app.use('/api/food', Food);
app.use('/api/category', Category);
app.use('/api/rating', Rating);
app.use('/api/user', User);
app.use('/api/cart', Cart);
app.use('/api/order', Order);






















app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
