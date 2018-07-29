// index.js
// call the packages we need
let express    = require('express');        // call express
let app        = express();                 // define our app using express
let bodyParser = require('body-parser');
const morgan = require('morgan'); // Request logger
let mysql = require('mysql');

// Modules
let router = require('./routes/routes');
let db = require('./sqldb/db');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middlewares
//middlewares
app.use(morgan('dev')); // for logging all the requests
// Add headers for CROS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,PUT, PATCH, DELETE');
      // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.use("/", express.static("/root/website/cryptohype.github.io"))
let port = process.env.PORT || 16192;        // set our port
console.log('before router')
//Router
router(app);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening at port:' + port);

