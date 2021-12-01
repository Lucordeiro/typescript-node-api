import { Router } from 'express'
import UserController from './../controllers/userController'

import AuthMiddleware from '../middlewares/auth';

const authMiddleware = new AuthMiddleware();

const routes = Router()

routes.get('/', authMiddleware.verifyToken,UserController.index)
routes.post('/auth', UserController.auth)
routes.get('/logout', UserController.logout)
routes.post('/', UserController.store)
routes.put('/:id', authMiddleware.verifyToken,UserController.update)
routes.delete('/:id', authMiddleware.verifyToken,UserController.delete)


export default routes