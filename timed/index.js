const { getVIPCallList } = require('../src/core/redisHandler')

const arrayOfCalls = getVIPCallList()
console.log(arrayOfCalls)
