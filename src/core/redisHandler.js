const redis = require('redis')
const config = require('config')

const redisClient = redis.createClient({
  host: config.get('redisHost'),
})

function addVIPCallToList (call) {
  throw new Error('hi')
//   return redisClient.sadd('vip', JSON.stringify(call))
}

function getVIPCallList () {
  return redisClient.smembers('vip')
}

module.exports = { addVIPCallToList, getVIPCallList, redisClient }
