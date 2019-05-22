import app from '../server/app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.should();
chai.use(chaiHttp);

describe('USER TEST', () => {
  it('Should create a new user', (done) => {
    const user = {
      firstname: 'Patrick',
      lastname: 'Ngabonziza',
      gender: 'Male',
      address: 'Kigali, Kicukiro',
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

  it('It should return the list of all users', (done) => {
    chai
      .request(app)
      .get('/api/v1/users')
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should be able to login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin').send({
        email: 'ngabop7@gmail.com',
        password: '12345678',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('status');
        res.body.should.have.property('isAdmin');
      });
    done();
  });
  it('should throw error when the login email does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin').send({
        email: 'ngabo@gmail.com',
        password: '12345678',
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

});