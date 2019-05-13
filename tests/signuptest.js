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
      address: 'Kigali',
      email: 'ngabop7@gmail.com',
      password: '12345',
    };

    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.should.have.status(201);
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        done();
      });
  });
  it('should return error when firstname is empty', (done) => {
    const user = {
      lastname: 'Ngabonziza',
      gender: 'Male',
      address: 'Kigali',
      email: 'ngabo@gmail.com',
      password: '12345'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return 400 when email has already taken', (done) => {
    const user = {
      lastname: 'Ngabonziza',
      gender: 'Male',
      address: 'Kigali',
      email: 'ngabop7@gmail.com',
      password: '12345'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return error when lastname is empty', (done) => {
    const user = {
      firstname: 'Patrick',
      gender: 'Male',
      address: 'Kigali',
      email: 'ngabo@gmail.com',
      password: '12345'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  // VERIFY USER
  it('should return be able to verify user', (done) => {
    const id=1;
    const user = {
      status: 'verified'
    };
    chai.request(app)
      .patch(`/api/v1/users/${id}`)
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});