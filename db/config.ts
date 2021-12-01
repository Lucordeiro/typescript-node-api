import { Dialect, Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME || 'challenge2' as string
const dbUser = process.env.DB_USER || 'postgres' as string
const dbHost = process.env.DB_HOST || 'localhost'
const dbDriver = process.env.DB_DIALECT as Dialect || 'postgres' as Dialect
const dbPassword = process.env.DB_PASS || 'toor'

console.log('ENV=> ',process.env.DB_USER)

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, { host: dbHost, dialect: dbDriver})

export default sequelizeConnection