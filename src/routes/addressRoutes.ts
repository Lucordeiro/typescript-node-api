import { Router } from 'express'
import addressController from '../controllers/addressController';

import AuthMiddleware from '../middlewares/auth';
const authMiddleware = new AuthMiddleware();

const routes = Router()

routes.get('/:id', authMiddleware.verifyToken, addressController.index)
routes.get('/user/:id', authMiddleware.verifyToken, addressController.getByUser)
routes.post('/', authMiddleware.verifyToken, addressController.store)
routes.put('/:id', authMiddleware.verifyToken, addressController.update)
routes.delete('/:id', authMiddleware.verifyToken, addressController.delete)


export default routes