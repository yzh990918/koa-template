const {SendEmailValidator} = require('../validator/validator')
const {send} =require('../util/mailSend')
const moment =require('moment')
class UserService{
  constructor(){}
  async sendEmail(ctx,next){
  const v = await new SendEmailValidator().validate(ctx)
  const userName = v.get('body.userName')
  const result = await send({
    // 验证码: 暂时模拟为1234
    code:1234,
    // 有效时间:创建模拟的格式化的时间
    expire:moment().add(30,"minutes").format('YYYY-MM-DD HH:mm:ss'),
    email:userName,
    user:'努力中的杨先生'
  })
  ctx.body = {
    code:200,
    message:"邮件发送成功",
    data:result
  }
}

}
module.exports = new UserService()

