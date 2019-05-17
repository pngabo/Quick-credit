import app from '../server/app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.should();
chai.use(chaiHttp);

describe('LOAN REPAYMENT', () => {
    it('User should be able to pay a loan', (done) => {
        const repayments = {
          paidAmount: '10000',
        };
        chai.request(app)
          .post('/api/v1/loans/1/repayments')
          .send(repayments)
          .end((err, res) => {
            res.should.have.property('status').eql(201);
            res.body.should.be.a('object');
            done();
          });
      });
});
