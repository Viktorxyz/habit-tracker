import myqsl from 'mysql2/promise'

const pool = myqsl.createPool({
  host: 'sql11.freemysqlhosting.net',
  user: 'sql11683319',
  password: 'krWgQ4Fa5h',
  database: 'sql11683319',
  connectionLimit: 10
})

export default pool