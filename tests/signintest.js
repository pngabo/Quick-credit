import app from '../server/app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.should();
chai.use(chaiHttp);

describe('TEST SIGN IN', () => {
    // it('should be able to login', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/auth/signin').send({
    //       email: 'ngabop7@gmail.com',
    //       password: '12345678',
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       // res.body.data.should.have.property('data');
    //       res.body.data.should.have.property('token');
    //       // res.body.data.should.have.property('status');
    //       // res.body.should.have.property('isAdmin');
          
    //     });
    //     done();
    // });
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
    it('should throw error when Incorrect password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin').send({
          email: 'admin@gmail.com',
          password: '12345sdfsd',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should throw error when entered no email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin').send({
          password: 'admin123',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should throw error when no password entered', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin').send({
          email: 'admin@gmail.com',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });