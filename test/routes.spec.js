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

  describe('GET /api/v1/foods', () => {
    it('returns all foods currently in the database', () => {
      return chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('array')
        response.body.length.should.equal(3)
        response.body[0].should.deep.equal({id: 1, name: 'Banana', calories: 150})
        response.body[1].should.deep.equal({id: 2, name: 'Yogurt', calories: 550})
        response.body[2].should.deep.equal({id: 3, name: 'Apple', calories: 220})
      })
      .catch((error) => {
        throw error
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
        response.body.should.be.a('object')
        response.body.should.deep.equal({id: 1, name: 'Banana', calories: 150})
      })
      .catch((error) => {
        throw error
      })
    })

    it('returns a different food object when passed another :id', () => {
      return chai.request(server)
      .get('/api/v1/foods/2')
      .then(response => {
        response.body.should.deep.equal({id: 2, name: 'Yogurt', calories: 550})
      })
      .catch((error) => {
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

  describe('POST /api/v1/foods', function() {
    it('creates a new food and returns the food item if successful', () => {
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
      .catch((error) => {
        throw error
      })
    })

    describe('returns 400 status code for unsuccessful post', () => {
      it('requires a name', () => {
        return chai.request(server)
        .post('/api/v1/foods')
        .send({ food: { calories: 5 } })
        .then(response => {
          response.should.have.status(400)
        })
        .catch(error => {
          throw error
        })
      })

      it('requires calories', () => {
        return chai.request(server)
        .post('/api/v1/foods')
        .send({ food: { name: "crackers" } })
        .then(response => {
          response.should.have.status(400)
        })
        .catch(error => {
          throw error
        })
      })
    })
  })

  describe('PATCH /api/v1/foods/:id', () => {
    it('updates an existing food', () => {
      return chai.request(server)
      .patch('/api/v1/foods/1')
      .send({ food: { name: "Chocolate Covered Banana", calories: 500 } })
      .then(response => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.deep.equal({id: 1, name: "Chocolate Covered Banana", calories: 500 })
      })
      .catch((error) => {
        throw error
      })
    })

    it('returns a 404 status code if a food with the given id DNE', () => {
      return chai.request(server)
      .patch('/api/v1/foods/9')
      .send({ food: { name: "Chocolate Covered Banana", calories: 500 } })
      .then(response => {
        response.should.have.status(404)
      })
      .catch((error) => {
        throw error
      })
    })
  })

  describe('DELETE /api/v1/foods/:id', () => {
    it('deletes the food with the given id', () => {
      return chai.request(server)
      .delete('/api/v1/foods/1')
      .then(response => {
        response.should.have.status(204)
      })
      .catch((error) => {
        throw error
      })
    })

    it('returns a 404 status code if the food with that id does not exist', () => {
      return chai.request(server)
      .delete('/api/v1/foods/400')
      .then(response => {
        response.should.have.status(404)
      })
    })
  })
})
