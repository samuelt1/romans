
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/index');
chai.should()

chai.use(chaiHttp);

/*=============================================*/
/*================== [End to End] ===================*/
/*=============================================*/
describe('romannumeral:', () => {
    describe('query:', () => {
        /*---------------------------------------------*/
        /*-------------- [ERROR TESTING] --------------*/
        /*---------------------------------------------*/

        it(`should fail because there is nothing in there`, (done) => {
            chai.request(server)
                .get(`/romannumeral`)
                .end((err, res) => {
                    if (res.status != 400) {
                        console.log(res.text);
                    }
                    res.should.have.status(400);
                    var message = JSON.parse(res.text);
                    chai.assert.equal(message.name, "BadRequestError");
                    done();
                });
        });
        it(`should fail because of a lack of numbers`, (done) => {
            chai.request(server)
                .get(`/romannumeral?query=abc`)
                .end((err, res) => {
                    if (res.status != 400) {
                        console.log(res.text);
                    }
                    res.should.have.status(400);
                    var message = JSON.parse(res.text);
                    chai.assert.equal(message.name, "BadRequestError");
                    done();
                });
        });

        /*---------------------------------------------*/
        /*----------------- [NORMAL] ------------------*/
        /*---------------------------------------------*/

        it(`should work`, (done) => {
            chai.request(server)
                .get(`/romannumeral?query=123`)
                .end((err, res) => {
                    if (res.status != 200) {
                        console.log(res.text);
                    }
                    res.should.have.status(200);
                    var message = JSON.parse(res.text);
                    chai.assert.equal(message.input, 123);
                    chai.assert.equal(message.output, "CXXIII");
                    done();
                });
        });

        /*---------------------------------------------*/
        /*--------------- [Clean Up] ------------------*/
        /*---------------------------------------------*/

    });

    after(() => {
        server.listener.close()
    })
});
