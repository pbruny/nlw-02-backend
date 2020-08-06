import { Router } from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'

const classesController = new ClassesController()
const connectionsController = new ConnectionsController()

const routes = Router()

routes.get('/classes', classesController.index) 
routes.post('/classes', classesController.create)


routes.get('/connection', connectionsController.index)
routes.post('/connection', connectionsController.create)

export default routes