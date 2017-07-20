const express = require('express');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const crypto = require('crypto');


const indexController = require('./controllers/index-controller');
const userController = require('./controllers/user-controller');
const flipcardController = require('./controllers/flipcard-controller');


var router = express.Router();
var application = express();

application.engine('mustache', mustache());

// config
application.set('views', './views');
application.set('view engine', 'mustache');
//db
const models = require("./models");
application.use(express.static('/public'));

// var storage = {
//     // users: [{ name: 'admin', password: 'qwer1234' }],
//     // allGabs: [],
//     sessionId: 0,
//     sessions: [],
// };

// middleware
application.use(cookieParser());
application.use(bodyParser.urlencoded({extended: true}));
application.use(bodyParser.json());

application.use(session({
	secret: "secret_code_gabble",
	resave: false,
	saveUninitialized: true
}));
// application.use(expressValidator());

// controllers
//  /api/users
//  /api/decks
application.use(indexController);
application.use(userController);
application.use(flipcardController);
application.use(express.static('public'));

// application.use((request, response, next) => {
//     if (request.cookies.session !== undefined) {
//         var sessionId = parseInt(request.cookies.session);
//         var user = storage.sessions[sessionId];
//         var author = request.session.author;

//         if (!user) {
//             response.locals.user = { isAuthenticated: false };
//         }
//         else {
//             response.locals.user = { isAuthenticated: true };
//         }
//     } else {
//         response.locals.user = { isAuthenticated: false };
//     }

//     next();
// });

// var author = '';


// application.get('/', (request, response) => {
//     response.render('index');
// });
// application.get('/signup', (request, response) => {
//     response.render('signup');
// });
// application.post('/signup', (request, response) => {
//     //todo: validation

//     var user = {
//         name: request.body.name,
//         password: request.body.password
//     }

//     storage.users.push(user);

//     //todo: sell information to microsoft
//     response.redirect('/login');
// });
// application.get('/login', (request, response) => {
//     response.render('login');
// });
// application.post('/login', (request, response) => {
//     var name = request.body.name;
//     var password = request.body.password;

//     var user = storage.users.find(user => { return user.name === name && user.password === password })

//     if (!user) {
//         response.render('login');
//     } else {
//         var sessionId = storage.sessionId;
//         storage.sessionId++;
//         storage.sessions.push(user);

//         response.cookie('session', sessionId);

//         response.redirect('/allGabs');
//     }
// });

// application.get('/allGabs', (request, response) => {
//     if (request.cookies.session == !undefined) {
//         var model = { allGabs: storage.allGabs };
//         response.render('allGabs');
//     } else {
//         response.redirect('login');
//     }
// });
// application.post('/allGabs', (request, response) => {
//     response.render('allGabs');

// });
application.get('/allGabs/:flipcardId', (request, response) => {
    response.render('oneGab');
});
// application.get('/newGab', (request, response) => {
//     response.render('newGab');

// });
application.put('/allGabs/:flipcardId', (request, response) => {

});
module.exports = application;

application.listen(3000);