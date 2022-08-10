import express from 'express';

import userRoutes from './userRoutes';
import addressRoutes from './addressRoutes';

const app = express()

app.use('/api/user', userRoutes)
app.use('/api/address', addressRoutes)

export default app