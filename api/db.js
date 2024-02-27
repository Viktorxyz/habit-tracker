import myqsl from 'mysql2/promise'

const pool = myqsl.createPool({
  host: '127.0.0.1',
  user: 'smrda',
  password: 'fiatalbea1200',
  database: 'Hab.it',
  connectionLimit: 10
})

export default pool