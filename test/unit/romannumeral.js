
const chai = require('chai')
const roman = require('../../src/romannumeral/romannumeral')
chai.should()

/* ============================================= */
/* ================== [End to End] =================== */
/* ============================================= */
describe('romannumeral:', function () {
  describe('numToRom:', function () {
    /* --------------------------------------------- */
    /* -------------- [ERROR TESTING] -------------- */
    /* --------------------------------------------- */

    it('should throw on not a number', function (done) {
      chai.expect(() => roman.numToRom('123')).to.throw()
      chai.expect(() => roman.numToRom([123])).to.throw()
      chai.expect(() => roman.numToRom({})).to.throw()
      done()
    })

    /* --------------------------------------------- */
    /* ----------------- [NORMAL] ------------------ */
    /* --------------------------------------------- */

    it('should return 123', function (done) {
      chai.expect(roman.numToRom(123)).to.be.equal('CXXIII')
      done()
    })

    it('should return 10', function (done) {
      chai.expect(roman.numToRom(10)).to.be.equal('X')
      done()
    })

    it('should return 255', function (done) {
      chai.expect(roman.numToRom(255)).to.be.equal('CCLV')
      done()
    })

    it('should return 200', function (done) {
      chai.expect(roman.numToRom(200)).to.be.equal('CC')
      done()
    })

    it('should return 1', function (done) {
      chai.expect(roman.numToRom(1)).to.be.equal('I')
      done()
    })

    it('should work with zero', function (done) {
      chai.expect(roman.numToRom(0)).to.be.equal('')
      done()
    })

    it('should work with negatives', function (done) {
      chai.expect(roman.numToRom(-10)).to.be.equal('')
      done()
    })
  })
})
