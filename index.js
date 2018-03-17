// index.js

// call the packages we need
let express    = require('express');        // call express
let app        = express();                 // define our app using express
let bodyParser = require('body-parser');

// Modules
let router = require('./routes/routes');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 16192;        // set our port

//Router
router(app);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening at port:' + port);

