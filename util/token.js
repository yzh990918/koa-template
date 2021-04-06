const JWT = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config')
function sign(payload){
  // 默认保存用户的id信息
  const accessToken = JWT.sign({_id:payload.id},JWT_SECRET,{
    expiresIn: '1 days'
  })
  const refreshToken = JWT.sign({_id:payload.id},JWT_SECRET,{
    expiresIn: '30 days'
  })
  return {
    accessToken,
    refreshToken
  }
}
module.exports = {
  sign
};
