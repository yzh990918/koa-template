const JWT = require('jsonwebtoken')
const config = require('../config/config')
const { JWT_SECRET } = require('../config/config')
const moment = require('moment')
function sign(payload) {
  // 默认保存用户的id信息
  const accessToken = JWT.sign({ _id: payload.id }, JWT_SECRET, {
    expiresIn: '1 days',
  })
  const refreshToken = JWT.sign({ _id: payload.id }, JWT_SECRET, {
    expiresIn: '30 days',
  })
  return {
    accessToken,
    refreshToken,
  }
}

function verify(token) {
  try {
    const res = JWT.verify(token, config.JWT_SECRET)
    return {
      valid: !!res._id,
      valid_time: moment(res.exp * 1000).format('YYYY-MM-DD HH:mm:ss'),
    }
  } catch (error) {
    return false
  }
}

function getTokenPayload(authorization) {
  const token = authorization.split(' ')[1]
  return JWT.verify(token, JWT_SECRET)
}
module.exports = {
  sign,
  verify,
  getTokenPayload,
}
