const express = require('express');
const router = express.Router();
const models = require("../models");
const usermodel = require("../models/users");
const session = require('express-session');
const crypto = require('crypto');

// var storage = {
//     // users: [{ name: 'admin', password: 'qwer1234' }],
//     // allGabs: [],
//     sessionId: 0,
//     sessions: []
// };
router.use(session({
	secret: "secret_code_gabble",
	resave: false,
	saveUninitialized: true,
}))
function hashPassword(passwordinput) {
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
                    .update(passwordinput)
                    .digest('hex');
console.log(hash)
return hash;
}
//<---------- SIGNUP ------------->//
router.get('/signup', (request, response) => {

        response.render('signup');
})
router.post('/signup', (request, response) => {
    var user = {
        username: request.body.username,
        password: hashPassword(request.body.password),
        displayname: request.body.displayname
    }
    models.users.create(user);
    request.session.isAuthenticated = true;
    response.redirect('/login');
});
//<---------- LOGIN ------------->//
router.get('/login', (request, response) => {
    response.render('login');
});
router.post('/login', async (request, response) => {

   var user = await models.users.findOne({
        where: {
            username: request.body.username,
            password: hashPassword(request.body.password)
        }
    })
    if (!user) {
        response.render('login');
    } else {
        request.session.username = request.body.username; 
        request.session.isAuthenticated = true;
        request.session.userId = user.id;
        request.session.right = 0;
        request.session.wrong = 0;
        // request.session.author = user.displayname; 
        // author = request.session.author;
        console.log('this is the session user:',request.session.username);
        console.log('this is the session rights',request.session.right);


    response.redirect('/alldecks');
    }
});

module.exports = router;