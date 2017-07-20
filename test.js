const assert = require("assert");
const request = require('supertest');
// var request = require('superagent');
const application = require("./server");

describe('user-controller', function () {
  it("returns a 200", function (done) {
    request(application)
    .get('/')
    .expect(200)
    .end(done);
  })
})

describe('POST /newdeck', function () {
  it("should create new deck", function (done) {
    request(application)
    .post('/newdeck')
    .send({
        deckname: 'testdeckname',
        userId: 25
    })
    .expect(302)
    .end(done);

  })
});