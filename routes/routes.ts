import express from 'express';

import userRoutes from './userRoutes';
import addressRoutes from './addressRoutes';

const app = express()

app.use('/user', userRoutes)
app.use('/address', addressRoutes)

export default app