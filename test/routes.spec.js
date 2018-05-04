const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../app.js')

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch((error) => {
      throw error
    })
    .done()
  })

  beforeEach((done) => {
    database.seed.run()
    .then(() => done())
    .catch((error) => {
      throw error
    })
    .done()
  })

  describe('GET /api/v1/foods', function(){
    this.timeout(0)
    it('returns all foods currently in the database', () => {
      return chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('array')
        response.body.length.should.equal(3)
        response.body[0].should.be.a('object')
        response.body[0].id.should.equal(1)
        response.body[0].name.should.equal('Banana')
        response.body[0].calories.should.equal(150)
      })
      .catch((error) => {
        throw error
      })
    })
  })

  describe('GET /api/v1/foods/:id', function(){
    it('returns the food object with the specific :id in the url', () => {
      return chai.request(server)
      .get('/api/v1/foods/1')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.id.should.equal(1)
        response.body.name.should.equal('Banana')
        response.body.calories.should.equal(150)
      })
      .catch(error => {
        throw error
      })
    })

    it('returns a different food object when passed another :id', () => {
      return chai.request(server)
      .get('/api/v1/foods/2')
      .then(response => {
        response.body.id.should.equal(2)
        response.body.name.should.equal('Yogurt')
        response.body.calories.should.equal(550)
      })
      .catch(error => {
        throw error
      })
    })

    it('returns a status code 404 if the food is not found', () => {
      return chai.request(server)
      .get('/api/v1/foods/9')
      .then(response => {
        response.should.have.status(404)
      })
    })
  })

  describe('POST /api/v1/foods', () => {
    it('creates a new food and returns the food item if successful', () => {
      return chai.request(server)
      .post('/api/v1/foods')
      .send({food: { name: 'Cheese', calories: 200 } })
      .then(response => {
        response.should.have.status(201)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.id.should.equal(4)
        response.body.name.should.equal('Cheese')
        response.body.name.should.equal(200)
      })
      .catch(error => {
        throw error
      })
    })
  })
})
