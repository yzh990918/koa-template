const svgCaptcha = require("svg-captcha")
const {setValue} =require('../config/RedisConfig')
const {SidValidator} =require('../validator/validator')
class PublicService{
  constructor(){}
  async getCode(ctx,next){
    const v = await new SidValidator().validate(ctx)
    const sid = v.get('query.sid')
    const newCaptcha = svgCaptcha.create({
      // 指定验证长度
      size:4,
      // 指定忽略的字符
      ignoreChars:"0o1il",
      color:true,
      // 指定干扰线数量
      noise:Math.floor(Math.random()*5),
      width: 180,
      height: 40
    })

    // 将验证码值保存在redis中 并且设置十分钟有效时间
    // 设置时效单位为秒
    setValue(sid,newCaptcha.text,10*60)
    ctx.body={
      code:200,
      data:newCaptcha.data
    }
    
  }
}

module.exports = new PublicService()

