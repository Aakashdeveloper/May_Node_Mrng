let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing RRest API',() => {
    it('should test / endpoint', (done) => {
        chai
            .request('http://localhost:9900')
            .get('/')
            .then((res) => {
                expect(res).to.have.status(200)
                done()
            })
            .catch((err) => {
                throw err
            })
    })
    it('should test /users endpoint', (done) => {
        chai
            .request('http://localhost:9900')
            .get('/users')
            .then((res) => {
                expect(res).to.have.status(200)
                done()
            })
            .catch((err) => {
                throw err
            })
    })
    it('should test /addUser endpoint', (done) => {
        chai
            .request('http://localhost:9900')
            .post('/addUser')
            .send({"_id":34535,"name":"Zoe","city":"Helsinki","phone":353543,"isActive":true})
            .then((res) => {
                expect(res).to.have.status(200)
                done()
            })
            .catch((err) => {
                throw err
            })
    })
})