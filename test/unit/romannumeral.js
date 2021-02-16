
const chai = require('chai')
const roman = require('../../src/romannumeral/romannumeral')
chai.should()

/*=============================================*/
/*================== [End to End] ===================*/
/*=============================================*/
describe('romannumeral:', () => {
    describe('numToRom:', () => {
        /*---------------------------------------------*/
        /*-------------- [ERROR TESTING] --------------*/
        /*---------------------------------------------*/

        it(`should throw on not a number`, (done) => {
            chai.expect(() => roman.numToRom("123")).to.throw()
            chai.expect(() => roman.numToRom([123])).to.throw()
            chai.expect(() => roman.numToRom({})).to.throw()
            done()
        })

        /*---------------------------------------------*/
        /*----------------- [NORMAL] ------------------*/
        /*---------------------------------------------*/

        it(`should return 123`, (done) => {
            chai.expect(roman.numToRom(123)).to.be.equal('CXXIII')
            done()
        })

        it(`should return 10`, (done) => {
            chai.expect(roman.numToRom(10)).to.be.equal('X')
            done()
        })

        it(`should return 255`, (done) => {
            chai.expect(roman.numToRom(255)).to.be.equal('CCLV')
            done()
        })

        it(`should return 200`, (done) => {
            chai.expect(roman.numToRom(200)).to.be.equal('CC')
            done()
        })

        it(`should return 1`, (done) => {
            chai.expect(roman.numToRom(1)).to.be.equal('I')
            done()
        })

        it(`should work with zero`, (done) => {
            chai.expect(roman.numToRom(0)).to.be.equal('')
            done()
        })

        it(`should work with negatives`, (done) => {
            chai.expect(roman.numToRom(-10)).to.be.equal('')
            done()
        })
    })

})
