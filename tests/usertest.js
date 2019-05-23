import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import pool from '../server/models/connectdb';

chai.should();
chai.expect();
chai.use(chaiHttp);

let token = '';

describe('Homepage, user and required test to run others', () => {
  describe('Homepage', () => {
    it('it should open the homepage', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('User', () => {
    it('it should register a new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
            firstname: 'Patrick',
            lastname: 'Ngabonziza',
            gender: 'Male',
            address: 'Kigali, Kicukiro',
            phonenumber: "078409345324",
            occupation: "SoftwareD",
            email: 'ngabop7@gmail.com',
            password: '12345',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should not register a new user with empty field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
            firstname: ' ',
            lastname: 'Ngabonziza',
            gender: 'Male',
            address: 'Kigali, Kicukiro',
            phonenumber: "078409345324",
            occupation: "SoftwareD",
            email: 'ngabop7@gmail.com',
            password: '12345',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should not login the user with wrong email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'fridolinho12@gmail.com',
          password: '1234',
        })

        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should not login the user with wrong password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'fridolinho12@gmail.com',
          password: '123423',
        })

        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });

    describe('Register a user with data already in the database', () => {
      it('it should login the user', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'niyofree@yahoo.fr',
            password: '1234',
          })

          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            token = res.body.data[0].token;
            done();
          });
      });

      it('it should not register a new user with existing email', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstName: 'Niyongabo',
            lastName: 'Arsene',
            otherName: 'wenger',
            email: 'niyofree@yahoo.fr',
            phoneNumber: '0788778495',
            passportUrl: 'passport2.png',
            password: '1234',
          })

          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            done();
          });
      });
    });
  });

  describe('required to run other test', () => {
    it('it should POST an office', (done) => {
      chai.request(app)
        .post('/api/v1/offices')
        .set('x-http-token', token)
        .send({
          type: 'federal',
          name: 'Governor',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should POST loan application', (done) => {
      chai.request(app)
        .post('/api/v1/loans')
        .set('x-http-token', token)
        .send({
          email: 'ngabo@gmail.com',
          tenor: 10,
          amount: 500000,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          console.log(res.body);
          done();
        });
    });
    it('it should POST a loan later to be deleted', (done) => {
      chai.request(app)
        .post('/api/v1/loans')
        .set('x-http-token', token)
        .send({
            email: 'ngabo@gmail.com',
            tenor: 10,
            amount: 500000,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          console.log(res.body);
          done();
        });
    });

    
    it('it should not apply twice', (done) => {
      chai.request(app)
        .post('/api/v1/loans')
        .set('x-http-token', token)
        .send({
            email: 'ngabo@gmail.com',
            tenor: 10,
            amount: 500000,
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('Vote', () => {
    it('it should not add vote with invalid input', (done) => {
      chai.request(app)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          createdBy: 'clement',
          office: 1,
          candidate: 1,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not add vote with missing input', (done) => {
      chai.request(app)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          office: 1,
          candidate: 1,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not add vote with non existing user input', (done) => {
      chai.request(app)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          createdBy: 12,
          office: 1,
          candidate: 1,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not add vote with non existing office input', (done) => {
      chai.request(app)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          createdBy: 1,
          office: 12,
          candidate: 1,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not add vote with non existing candidate', (done) => {
      chai.request(app)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          createdBy: 1,
          office: 1,
          candidate: 12,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should add vote', (done) => {
      chai.request(app)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          createdBy: 1,
          office: 1,
          candidate: 1,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not vote twice one candidate', (done) => {
      chai.request(app)
        .post('/api/v1/votes')
        .set('x-http-token', token)
        .send({
          createdBy: 1,
          office: 1,
          candidate: 1,
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          done();
        });
    });
    describe('Petition', () => {
      it('it should not add petition with invalid input', (done) => {
        chai.request(app)
          .post('/api/v1/petition')
          .set('x-http-token', token)
          .send({
            createdBy: 'clement',
            office: 1,
            body: 1,
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
          });
      });
      it('it should not add petition with non existing user', (done) => {
        chai.request(app)
          .post('/api/v1/petition')
          .set('x-http-token', token)
          .send({
            createdBy: 12,
            office: 1,
            body: 'test petition',
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
          });
      });
      it('it should not add petition with non existing office', (done) => {
        chai.request(app)
          .post('/api/v1/petition')
          .set('x-http-token', token)
          .send({
            createdBy: 1,
            office: 12,
            body: 'test petition two',
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
          });
      });
      it('it should add petition', (done) => {
        chai.request(app)
          .post('/api/v1/petition')
          .set('x-http-token', token)
          .send({
            createdBy: 1,
            office: 1,
            body: 'test petition two',
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
          });
      });
      it('it should add not register petition that exist already', (done) => {
        chai.request(app)
          .post('/api/v1/petition')
          .set('x-http-token', token)
          .send({
            createdBy: 1,
            office: 1,
            body: 'test petition two',
          })
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            done();
          });
      });
    });
  });
});