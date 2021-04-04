const config = require('config')
const axios = require('axios')
const { addVIPCallToList } = require('../core/redisHandler')
const MultiError = require('../core/error/multiple')

async function handleCall (call) {
  if (call.customerStatus == 'VIP') {
    await vipCalled(call)
  }
}

async function vipCalled (call) {
  const errors = []
  try {
    addVIPCallToList(call)
  } catch (error) {
    console.log(error)
    errors.push(error)
  }

  const teamsConnector = config.get('teamsConnector')

  const content = {
    '@type': 'MessageCard',
    '@context': 'http://schema.org/extensions',
    themeColor: '444444',
    summ123ary: 'A VIP call completed',
    sections: [{
      activityTitle: 'A VIP has called',
      // We only need the time if the time is actually like the start time or something like that
      activitySubTitle: `${call.callData.direction} ${call.timestamp}`,
      activityImage: 'https://us.123rf.com/450wm/cowpland/cowpland1411/cowpland141100185/33679859-telephone-handsets-icon-flat-design-with-long-shadows-.jpg?ver=6',
      facts: [{
        name: 'Call Id',
        value: call.callId,
      }, {
        name: 'Duration',
        value: `${call.duration.value} ${call.duration.unit}`,
      }, {
        name: 'Waiting Time',
        value: `${call.waitingTime.value} ${call.waitingTime.unit}`,
      }, {
        name: 'Agent',
        value: `${call.agentData.agentId}:${call.agentData.agentName}`,
      }, {
        name: 'Duration',
        value: `${call.duration.value} ${call.duration.unit}`,
      }, {
        name: 'Caller Number',
        value: `${call.callData.callerNumber}`,
      }, {
        name: 'ccNumber',
        value: `${call.callData.ccNumber}`,
      }],
      markdown: true,
    }],
  }
  await axios.post(teamsConnector, content)
    .catch(err => {
      errors.push(err)
    })
  if (errors.length > 1) {
    throw new MultiError('Failed to handle VIP call', errors)
  } else if (errors.length == 1) {
    throw errors[0]
  }
}

module.exports = { handleCall }
