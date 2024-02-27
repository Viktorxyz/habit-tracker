import myqsl from 'mysql2/promise'

const pool = myqsl.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
  connectionLimit: 10
})

export default pool