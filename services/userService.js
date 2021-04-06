const User = require('../models/user.js')
const { AllReadyExistedException, ParameterException, NotFoundException } = require('../core/http-execption')
const bcrypt = require('bcryptjs')
const { sign } = require('../util/token.js')
class UserService{
  constructor(){}

  // 注册
  async register(payload) {
    // 是否已经注册
    const user = await User.findOne({ username: payload.username})
    let comparePassword = payload.password === payload.repassword
    if(user){
      throw new AllReadyExistedException('用户已注册')
    }
    if(!comparePassword){
      throw new ParameterException('重复密码不相同哦')
    }
    // 判断重复密码是否和密码相同
    else{
      // 加密 默认盐为10
      const sault = bcrypt.genSaltSync(10)
      payload.password = bcrypt.hashSync(payload.password,sault)
      return await User.create(payload)
    }
  }

  // 登录
  async login(payload){
    // 判断用户是否存在
    const user = await User.findOne({ username: payload.username})

    if(!user){
      throw new NotFoundException('用户不存在')
    }
    else{
      // 比对当前用户密码
      const checkPwd = bcrypt.compareSync(payload.password,user.password)

      if(checkPwd){
        // 颁发令牌
        const data = sign(user)
        return data
      }else{
        throw new ParameterException('密码错误')
      }
      
    }
  }
}
module.exports = new UserService()

