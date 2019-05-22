import app from '../server/app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.should();
chai.use(chaiHttp);

describe('TEST APPLY FOR LOAN', () => {
    it('should be able apply for loan', (done) => {
        chai.request(app)
            .post('/api/v1/loans').send({
                email: 'ngabom@gmail.com',
                tenor: 12,
                amount: 40000,
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.an('object');
                res.body.should.have.property('data');
                done();
            });
    });

    it('it should display all loans', (done) => {
        chai.request(app)
            .get('/api/v1/loans')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
    it('it should show a specific loans', (done) => {
        chai.request(app)
            .get('/api/v1/loans/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should Approve or Reject loan application', (done) => {
        chai.request(app)
            .patch('/api/v1/loans/1')
            .send({
                status: 'approved'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
    it('It should get all repaid loans', (done) => {
        chai.request(app).get('/api/v1/loans?status=approved&repaid=true')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.should.be.a('array');
                done();
            });
    });
});