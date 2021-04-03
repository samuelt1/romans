const config = require('config')
const { sendEmail } = require('../core/email')
const FailedMailError = require('../core/error/failed-mail')

// {
//     "callId" : "<String>",
//     "timestamp" : "<Datetime as String>",
//     "duration" : {
//         "value" : "<Long>",
//         "unit" : ["MILLISECONDS", "SECONDS", "MINUTES"]
//     },
//     "waitingTime": {
//         "value" : "<Long>",
//         "unit" : ["MILLISECONDS", "SECONDS", "MINUTES"]
//     },
//     "agentData" : {
//         "agentId" : "<String>",
//         "agentName" : "<String>",
//         "agentEmail" : "<String>"
//     },
//     "callData" : {
//         "callerNumber" : "<String>",
//         "ccNumber" : "<String>",
//         "direction" : ["INBOUND", "OUTBOUND"]
//     },
//     "customerStatus" : ["NORMAL", "VIP"]
// }

function handleCall (call) {
  if (call.customerStatus == 'VIP') {
    vipCalled(call)
  }
}

function vipCalled (call) {
  const managerEmail = config.get('managerEmail')

  try {
    sendEmail(managerEmail, 'VIP called', JSON.stringify(call))
  } catch (error) {
    throw new FailedMailError('Failed to properly send the mail')
  }
}

module.exports = { handleCall }
