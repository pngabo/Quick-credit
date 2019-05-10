import app from '../server/app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.should();
chai.use(chaiHttp);

describe('USER SIGN UP TEST', () => {
  it('Should create a new user', (done) => {
    const user = {
      firstname: 'Patrick',
      lastname: 'Ngabonziza',
      gender: 'Male',
      address:'Kigali',
      email: 'ngabo@gmail.com',
      password: '12345',
      // isAdmin: false
    };

    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.status(201);
        res.body.should.have.property('status');
        // res.body.should.have.property('token');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        // res.body.data.should.have.property('isAdmin');
        done();
      });
  });
  it('should return', (done) => {
    const user = {
      firstname: 'Patrick',
      lastname: 'Ngabonziza',
      gender: 'Male',
      address:'Kigali',
      email: 'ngabo@gmail.com',
      password: '12345'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('First name is required');
        done();
      });
  });

});