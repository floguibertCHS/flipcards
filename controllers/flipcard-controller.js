const express = require('express');
const router = express.Router();
var shuffle = require('shuffle-array'), cards = [];
const models = require("../models")
const flipcardmodel = require("../models/flipcard");
const deckmodel = require("../models/decks");

// /api/flipcards/alldecks
//  / === /api/flipcards
//<---------- VIEW ALL DECKS ------------->//
router.get('/alldecks', async(request, response) => {
    let decks = await models.decks.findAll();
    let deckname = decks.deckname;
    response.render("alldecks", {decks: decks, deckname: decks.deckname});
  });
//<---------- CREATE NEW DECK ------------->//
router.get('/newdeck', (request, response) => {
    response.render('newdeck');
});
router.post('/newdeck', (request, response) => {
    var deck = {
        deckname: request.body.deckname,
        userId: request.session.userId
    }
    models.decks.create(deck);
    response.redirect('/alldecks');
});
//<---------- CREATE NEW flipcard ------------->//
router.get('/decks/:deckId/newflipcard', (request, response) => {
    var deckId= parseInt(request.params.deckId);
    response.render('newflipcard', {deckId: deckId});
});

router.post('/decks/:deckId/newflipcard', async (request, response) => {
    var deckId = parseInt(request.params.deckId);
    var flipcard = {
        question: request.body.question,
        answer: request.body.answer,
        userId: request.session.userId,
        deckId: parseInt(request.params.deckId)
    }
    await models.flipcard.create(flipcard);
    response.redirect('/decks/' + deckId);
});

//<---------- VIEW deck------------->//
router.get("/decks/:deckId", async (request, response) =>{
    var deckId = parseInt(request.params.deckId);
    var deck = await models.decks.findById(deckId);
    let deckname = deck.deckname;
    var rights = request.session.right;
    var wrongs = request.session.wrong;
    console.log('this is the deck name', deckname);
    models.flipcard.findAll({
        where: { 
            deckId: parseInt(request.params.deckId) 
        }
        })
    .then(function (cards) {
        return response.render('deckCards', {deckname: deckname, flipcards: shuffle(cards), deckId: parseInt(request.params.deckId), rights: rights, wrongs: wrongs});
});
});
/////////EDIT card///////
router.get('/decks/:deckId/edit/:id', async(request, response) => {
    var id = request.params.id;
        console.log(id);
    var  flipcard = await models.flipcard.findById(id);
    var model = {flipcard: flipcard};
    response.render('editflipcard',model);
});
    /////SAVE EDITS////
router.post('/decks/:deckId/edit/:id', (request, response) => {
    var deckId = request.params.deckId;
models.flipcard.update({
        question: request.body.question,
        answer: request.body.answer
    }, {
        where:{
            id: request.params.id
        }
    }).then(function(updatedFlip){
        return response.redirect('/decks/'+deckId);
    })
});
//////DELETE card/////
router.post('/decks/:deckId/delete/:id', async (request, response) => {
        var deckId = request.params.deckId;
        await models.flipcard.destroy({
        where: {
            id: request.params.id,
    }
    }) 
response.redirect('/decks/' + deckId);
});
//////thumbs up/////
router.post('/decks/:deckId/flipcard/:id/right', (request, response) => {
    var deckId = request.params.deckId;
        request.session.right += 1;
        console.log('number of rights:', request.session.right)
            return response.redirect('/decks/' + deckId);
        });
//////thumbs down/////
router.post('/decks/:deckId/flipcard/:id/wrong', (request, response) => {
    var deckId = request.params.deckId;
        request.session.wrong += 1;
        console.log('number of wrongs:', request.session.wrong)
            return response.redirect('/decks/' + deckId);
        });        

module.exports = router;

// router.get("/flipcards", async (request, response) => {
//     let flipcards = await models.flipcard.findAll();
//     response.send(flipcards);
// });
/////////////////////////////////////////
// router.post('/deckCards', (request, response) => {
//     response.render('deckCards');

// });