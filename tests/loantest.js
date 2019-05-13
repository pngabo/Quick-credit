import app from '../server/app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.should();
chai.use(chaiHttp);

describe('TEST APPLY FOR LOAN', () => {
    it('should be able apply for loan', (done) => {
        chai.request(app)
            .post('/api/v1/loans').send({
                email: 'ngabop7@gmail.com',
                tenor: 10,
                amount: 50000,
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.an('object');
                res.body.should.have.property('data');
                done();
            });
    });
    it('should throw error when the  email does not exist', (done) => {
        chai.request(app)
            .post('/api/v1/loans').send({
                tenor: 5,
                amount: 230000,
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('should throw error when entered no email', (done) => {
        chai.request(app)
            .post('/api/v1/loans').send({
                tenor: 8,
                amount: 120000,
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('should throw error when no tenor entered', (done) => {
        chai.request(app)
            .post('/api/v1/loans').send({
                email: 'admin@gmail.com',
                amount: 50000,
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('should throw error when no amount entered', (done) => {
        chai.request(app)
            .post('/api/v1/loans').send({
                email: 'admin@gmail.com',
                tenor: 12,
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('should return all loans', (done) => {
        chai.request(app)
            .patch('/api/v1/loans/1').send({
               
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
           
    });
});