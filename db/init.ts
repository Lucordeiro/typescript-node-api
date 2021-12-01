require('dotenv').config()

import { User, Address } from '../models'

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all([
    User.sync({ alter: isDev || isTest }),
    Address.sync({ alter: isDev || isTest }),

  ])

export default dbInit 