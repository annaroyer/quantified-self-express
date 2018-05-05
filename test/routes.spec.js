const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../app.js')

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

function foodsCount(){
  return database('foods').count('id')
  .then(count => parseInt(count[0].count))
}

chai.use(chaiHttp)

describe('API Routes', function(){
  this.timeout(0)
  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch((error) => {throw error})
    .done()
  })

  beforeEach((done) => {
    database.seed.run()
    .then(() => done())
    .catch((error) => {throw error})
    .done()
  })

  describe('GET /api/v1/foods', () => {
    it('returns all foods currently in the database', () => {
      return chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.deep.equal([{id: 1, name: 'Banana', calories: 150},
                                         {id: 2, name: 'Yogurt', calories: 550},
                                         {id: 3, name: 'Apple', calories: 220}
                                       ])
      })
    })
  })

  describe('GET /api/v1/foods/:id', () => {
    it('returns the food object with the specific :id in the url', () => {
      return chai.request(server)
      .get('/api/v1/foods/1')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.deep.equal({id: 1, name: 'Banana', calories: 150})
      })
    })

    it('returns a different food object when passed another :id', () => {
      return chai.request(server)
      .get('/api/v1/foods/2')
      .then(response => {
        response.body.should.deep.equal({id: 2, name: 'Yogurt', calories: 550})
      })
    })

    it('returns a 404 if a food with given id DNE', () => {
      return chai.request(server)
      .get('/api/v1/foods/4')
      .then(response => response.should.have.status(404))
    })
  })

  describe('POST /api/v1/foods', function() {
    it('creates a new food and returns the food item if successful', () => {

      foodsCount().then(count => count.should.equal(3))

      return chai.request(server)
      .post('/api/v1/foods')
      .send({ food: { name: 'Cheese', calories: 200 } })
      .then(response => {
        response.should.have.status(201)
        response.should.be.json
        response.body.should.be.a('object')
        Object.keys(response.body).length.should.equal(3)
        response.body.name.should.equal('Cheese')
        response.body.calories.should.equal(200)
      })

      foodsCount(),then(count => count.should.equal(4))
    })

    describe('returns 400 status code for unsuccessful post', () => {
      it('requires a name', () => {
        return chai.request(server)
        .post('/api/v1/foods')
        .send({ food: { calories: 5 } })
        .then(response => response.should.have.status(400))

        foodsCount().then(count => count.should.equal(3))
      })

      it('requires calories', () => {
        return chai.request(server)
        .post('/api/v1/foods')
        .send({ food: { name: "crackers" } })
        .then(response => response.should.have.status(400))

        foodsCount().then(count => count.should.equal(3))
      })
    })
  })

  describe('PATCH /api/v1/foods/:id', () => {
    it('updates an existing food', () => {
      let food = require('../models/food')
      let banana = {id: 1, name: "Banana", calories: 150}
      let chocolateBanana = {id: 1,
                             name: "Chocolate Covered Banana",
                             calories: 500
                            }

      food.find(1).then(banana => banana.should.deep.equal(banana))

      return chai.request(server)
      .patch('/api/v1/foods/1')
      .send({ food: { name: "Chocolate Covered Banana", calories: 500 } })
      .then(response => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.deep.equal(chocolateBanana)
      })

      food.find(1).then(banana => banana.should.deep.equal(chocolateBanana))
    })

    it('returns a 404 if a food with the given id DNE', () => {
      return chai.request(server)
      .patch('/api/v1/foods/9')
      .send({ food: { name: "Chocolate Covered Banana", calories: 500 } })
      .then(response => {
        response.should.have.status(404)
      })
    })
  })

  describe('DELETE /api/v1/foods/:id', () => {
    it('deletes the food with the given id', () => {

      foodsCount().then(count => count.should.equal(3))

      return chai.request(server)
      .delete('/api/v1/foods/1')
      .then(response => response.should.have.status(204))

      foodsCount().then(count => count.should.equal(2))
    })

    it('returns a 404 if a food with the given id DNE', () => {
      return chai.request(server)
      .delete('/api/v1/foods/400')
      .then(response => response.should.have.status(404))

      foodsCount().then(count => count.should.equal(3))
    })
  })
})
