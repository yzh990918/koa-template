const { successResponse } = require('../core/success')
const userService = require('../services/userService')
const {
  RegisterValidator,
  LoginValidator,
  TokenValidator,
  PasswordValidator,
} = require('../validator/validator')
const { getTokenPayload } = require('../util/token')
class UserController {
  constructor() {}
  // 注册
  async register(ctx) {
    // 参数校验 可在validator.js定义
    const v = await new RegisterValidator().validate(ctx)
    // 接受参数
    const payload = v.data.body || {}
    // 业务处理
    const res = await userService.register(payload)
    if (res) {
      ctx.body = successResponse('用户注册成功')
    }
  }

  // 登录
  async login(ctx) {
    // 校验参数
    const v = await new LoginValidator().validate(ctx)
    const payload = v.data.body || {}
    const res = await userService.login(payload)
    if (res) {
      ctx.body = successResponse('登录成功', res)
    }
  }

  // 验证token
  async verify(ctx) {
    const v = await new TokenValidator().validate(ctx)
    const token = v.data.query.token
    const res = await userService.tokenVerify(token)
    ctx.body = successResponse('操作成功', res)
  }

  // 修改密码
  async updatePwd(ctx) {
    const v = await new PasswordValidator().validate(ctx)
    const payload = v.data.body
    const AuthHeader = ctx.request.header.authorization
    const tokenPayload = await getTokenPayload(AuthHeader)
    const res = await userService.modifyPwd(payload, tokenPayload._id)
    if (res) {
      ctx.body = successResponse('修改密码成功')
    }
  }

  // 获取当前登录用户身份信息
  async getUserInfo(ctx) {
    const AuthHeader = ctx.request.header.authorization
    const payload = await getTokenPayload(AuthHeader)
    const res = await userService.getInfo(payload._id)
    if (res) {
      ctx.body = successResponse('获取用户信息成功', res)
    }
  }

  async updateAvatar(ctx) {
    const file = ctx.request.files.file
    const AuthHeader = ctx.request.header.authorization
    const tokenPayload = await getTokenPayload(AuthHeader)

    const res = await userService.updateAvatarInfo({
      file,
      id:tokenPayload._id
    })
    if(res) {
      ctx.body = successResponse('更新头像成功',{url:res},)
    }
  }
}

module.exports = new UserController()
