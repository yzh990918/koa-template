const User = require('../models/user.js')
const {
  AllReadyExistedException,
  ParameterException,
  NotFoundException,
  ForbidenException,
} = require('../core/http-execption')
const bcrypt = require('bcryptjs')
const { sign, verify } = require('../util/token.js')
const { uploadPath, baseUrl } = require('../config/config.js')
const moment = require('moment')
const mkdir = require('make-dir')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const attachment = require('../models/attachment')
class UserService {
  constructor() {}

  // 注册
  async register(payload) {
    // 是否已经注册
    const user = await User.findOne({ username: payload.username })
    let comparePassword = payload.password === payload.repassword
    if (user) {
      throw new AllReadyExistedException('用户已注册')
    }
    if (!comparePassword) {
      throw new ParameterException('重复密码不相同哦')
    }
    // 判断重复密码是否和密码相同
    else {
      // 加密 默认盐为10
      const sault = bcrypt.genSaltSync(10)
      payload.password = bcrypt.hashSync(payload.password, sault)
      return await User.create(payload)
    }
  }

  // 登录
  async login(payload) {
    // 判断用户是否存在
    const user = await User.findOne({ username: payload.username })

    if (!user) {
      throw new NotFoundException('用户不存在')
    } else {
      // 比对当前用户密码
      const checkPwd = bcrypt.compareSync(payload.password, user.password)

      if (checkPwd) {
        // 颁发令牌
        const data = sign(user)
        return data
      } else {
        throw new ParameterException('密码错误')
      }
    }
  }

  // 验证token
  async tokenVerify(payload) {
    const token = payload
    const res = verify(token)
    return res
  }

  // 修改密码
  async modifyPwd(payload, id) {
    // 判断当前是否存在用户
    const user = await User.findById(id)
    if (!user) {
      throw new ForbidenException('请先登录')
    } else {
      if (payload.newPassword !== payload.renewPassword) {
        throw new ParameterException('输入重复密码错误哦')
      }
      const sault = bcrypt.genSaltSync(10)
      payload = {
        username: user.username,
        password: bcrypt.hashSync(payload.newPassword, sault),
      }
      return await User.updateOne(payload)
    }
  }

  // 获取当前用户信息
  async getInfo(id) {
    try {
      // 需要过滤密码
      const user = await User.findOne({ _id: id }, { password: 0 })
      if (user) {
        return user
      } else {
        throw new NotFoundException('寻找用户时发生错误')
      }
    } catch (error) {
      throw new NotFoundException('寻找用户时发生错误')
    }
  }

  // 更新头像
  async updateAvatarInfo(payload) {
    const file = payload.file
    const id = payload.id
    const extraName = file.name.split('.')[1]
    const dir = `${uploadPath}/${moment().format('YYYY-MM-DD')}`
    await mkdir(dir)
    const uu = uuid()
    const realPath = `${dir}/${uu}.${extraName}`
    const returnPath = `${moment().format(
      'YYYY-MM-DD'
    )}/${uu}.${extraName}`
    const url = `${baseUrl.development}/${returnPath}`
    // 读写文件
    const reader = fs.createReadStream(file.path)
    const upStream = fs.createWriteStream(realPath)
    reader.pipe(upStream)

    try {
      // 存入数据
      await attachment.create({
        fileName:uu,
        extraName,
        creatorId:id,
        path: returnPath,
      })
     const res = await User.updateOne({_id:id},{avatar: url})
      if (res) {
       return url
      }
    } catch (error) {
      throw new ParameterException('更新头像失败')
    }
  }
}
module.exports = new UserService()
