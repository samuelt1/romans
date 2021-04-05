const { getVIPCallList } = require('../../src/core/redisHandler')
const { sendEmail } = require('../../src/core/email')
const logger = require('../../src/core/logger')
const config = require('config')

start()

async function start () {
  try {
    const arrayOfCalls = await getVIPCallList()
    // Dont send an email if there is nothing
    if (arrayOfCalls == 0) {
      process.exit(0)
    }

    const parsedArrayOfCalls = arrayOfCalls.map(call => JSON.parse(call))
    await sendEmail(
      config.get('managerEmail'),
      'Vip  contact report',
      'vip',
      parsedArrayOfCalls,
    )
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
  process.exit(0)
}
