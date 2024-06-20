require('dotenv').config();

const express= require("express");
const expressLayout = require('express-ejs-layouts');
// const {flash} = require('express-flash-message');

const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const connectDB = require('./server/config/db');

const app = express();
const port = 7002 || process.env.PORT;

// connect to database
connectDB();

app.use(express.urlencoded({ extended: true })); //both of these statements are middleware
app.use(express.json());  //to help pass the data
app.use(methodOverride('_method')); 

// static file
app.use(express.static('public')); //will contain css,js img etc. inside itself

// Express Session
   app.use(
        session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 24 * 7, //one week approx time
        }
   })
);

//Flash messsage
app.use(flash({ sessionKeyName: 'flashMessage' }));

//templet engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// //home /-setting route for it
// app.get('/', (req, res) => {

//     const locals ={
//         title: 'Admin Paage',
//         description: 'Project work'
//     }

//     res.render('index', locals );
// });

 // Routes
 app.use('/', require('./server/routes/users'))




//handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`Working on port no- ${port}`);
});

