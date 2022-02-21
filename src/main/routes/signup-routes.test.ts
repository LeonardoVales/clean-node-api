import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  it('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
          name: 'Leonardo',
          email: 'leo@gmail.com',
          password: '123456',
          passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
