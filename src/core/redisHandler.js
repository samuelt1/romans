const redis = require('redis')
const config = require('config')
const redisClient = redis.createClient({
  host: config.get('redisHost'),
})

module.exports = {
  addVIPCallToList (call) {
    return new Promise((resolve, reject) => {
      redisClient.sadd('vip', JSON.stringify(call), (err, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      })
    })
  },
  getVIPCallList () {
    return new Promise((resolve, reject) => {
      redisClient.smembers('vip', (err, arrayOfVipCalls) => {
        if (err) {
          reject(err)
        } else {
          resolve(arrayOfVipCalls)
        }
      })
    })
  },
  deleteKey (key) {
    return new Promise((resolve, reject) => {
      redisClient.del(key, (err, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      })
    })
  },
  redisClient,
}
