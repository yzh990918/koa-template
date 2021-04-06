const { successResponse } = require("../core/success");
const userService = require("../services/userService");
const { RegisterValidator, LoginValidator } = require("../validator/validator");

class UserController {
  constructor(){
  }
  // 注册
  async register(ctx,next) {
    // 参数校验 可在validator.js定义
    const v = await new RegisterValidator().validate(ctx)
    // 接受参数
    const payload = v.data.body || {}
    // 业务处理
    const res = await userService.register(payload)
    if(res){
      ctx.body = successResponse('用户注册成功')
    }
  }

  // 登录
  async login (ctx,next) {
    // 校验参数
    const v = await new LoginValidator().validate(ctx)
    const payload = v.data.body || {}
    const res = await userService.login(payload)
    if(res){
      ctx.body = successResponse('登录成功',res)
    }
  }
}

module.exports = new UserController()

