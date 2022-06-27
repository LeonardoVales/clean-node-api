import { Router } from 'express'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adaptMiddlware } from '../adapters/express-middleware-adapter'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddlware(makeAuthMiddleware('admin'))
  const auth = adaptMiddlware(makeAuthMiddleware())

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
