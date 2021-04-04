const redis = require('redis')
const config = require('config')

const redisClient = redis.createClient({
  host: config.get('redisHost'),
})

module.exports = {
  addVIPCallToList (call) {
    return redisClient.sadd('vip', JSON.stringify(call))
  },
  getVIPCallList () {
    return redisClient.smembers('vip')
  },
  redisClient,
}
