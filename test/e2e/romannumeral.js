
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../src/index')
chai.should()

chai.use(chaiHttp)

/* ============================================= */
/* ================== [End to End] =================== */
/* ============================================= */
describe('romannumeral:', function () {
  describe('query:', function () {
    /* --------------------------------------------- */
    /* -------------- [ERROR TESTING] -------------- */
    /* --------------------------------------------- */

    it('should fail because there is nothing in there', function (done) {
      chai.request(server)
        .get('/romannumeral')
        .end((_err, res) => {
          if (res.status != 400) {
            console.log(res.text)
          }
          res.should.have.status(400)
          const message = JSON.parse(res.text)
          chai.assert.equal(message.name, 'BadRequestError')
          done()
        })
    })
    it('should fail because of a lack of numbers', function (done) {
      chai.request(server)
        .get('/romannumeral?query=abc')
        .end((_err, res) => {
          if (res.status != 400) {
            console.log(res.text)
          }
          res.should.have.status(400)
          const message = JSON.parse(res.text)
          chai.assert.equal(message.name, 'BadRequestError')
          done()
        })
    })

    /* --------------------------------------------- */
    /* ----------------- [NORMAL] ------------------ */
    /* --------------------------------------------- */

    it('should work', function (done) {
      chai.request(server)
        .get('/romannumeral?query=123')
        .end((_err, res) => {
          if (res.status != 200) {
            console.log(res.text)
          }
          res.should.have.status(200)
          const message = JSON.parse(res.text)
          chai.assert.equal(message.input, 123)
          chai.assert.equal(message.output, 'CXXIII')
          done()
        })
    })

    /* --------------------------------------------- */
    /* --------------- [Clean Up] ------------------ */
    /* --------------------------------------------- */
  })

  after(function () {
    server.listener.close()
  })
})
