class QueryService {
  constructor(dbPool) {
    this.pool = dbPool
  }

  async exec(query) {
    return new Promise((resolve, reject) => {
      this.pool.query(query, (error, results, fields) => {
        if (error) {
          reject(error)
        } else {
          resolve({
            results,
            fields
          })
        }
      })
    })
  }
}

module.exports = {
  QueryService
}