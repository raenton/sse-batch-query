class QueryService {
  constructor(dbPool) {
    this.pool = dbPool
  }

  async exec(query) {
    return new Promise((resolve, reject) => {
      this.pool.query(query, (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
    })
  }
}

module.exports = {
  QueryService
}