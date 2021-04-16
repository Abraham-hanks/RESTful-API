const should = require("should");

const request = require("supertest");
const mongoose = require("mongoose")
const app = require("../index"); 

process.env.ENV = "Test"; 

const Book = mongoose.model('Book')
const agent = request.agent(app);

describe('Book CRUD Test', () => {
    it('should allow a book to be posted and return read and  _id', (done) => {
        const bookPost = { title: 'My Book', author: 'Jon', genre: 'Fiction' }; 

        agent.post('/dev.api/v1/books')
        .send(bookPost)
        .expect(200)
        .end((err, results) => {
            // console.log(results)
            // results.body.read.should.not.equal(false)
            results.body.should.have.property('_id');
            done();
        })
    });

    afterEach((done) => {
        Book.deleteMany({}).exec();
        done();
    });

    after((done) => {
        mongoose.connection.close();
        app.server.close(done());
    });
});