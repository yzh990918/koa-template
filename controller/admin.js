const { successResponse } = require('../core/success')
const adminService = require('../services/adminService')
const {
  IdValidator,
  UserValidator,
  PageValidator,
} = require('../validator/validator')

class AdminController {
  constructor() {}

  // 删除指定id用户
  async deleteOne(ctx) {
    const v = await new IdValidator().validate(ctx)
    const id = v.data.path.id
    const res = await adminService.deleteOne(id)
    if (res) {
      ctx.body = successResponse('删除成功')
    }
  }

  // 批量删除用户
  async deleteUsers(ctx) {
    const v = await new IdValidator().validate(ctx)
    const ids = v.data.query.id.split(',') || []
    const res = await adminService.deleteUsersByIds(ids)
    if (res) {
      ctx.body = successResponse('删除成功')
    }
  }

  // 修改用户的信息
  async updateUser(ctx) {
    await new UserValidator().validate(ctx)
    const payload = ctx.request.body || {}
    const res = await adminService.updateUserInfo(payload)
    if (res) {
      ctx.body = successResponse('更新用户信息成功')
    }
  }

  // 查找指定id的用户信息
  async getUserInfo(ctx) {
    const v = await new IdValidator().validate(ctx)
    const id = v.data.path.id
    const res = await adminService.getUserInfo(id)
    if (res) {
      ctx.body = successResponse('获取用户信息成功', res)
    }
  }

  // 查找系统用户列表
  async getsystemUserlist(ctx) {
    ctx.query.page = Number(ctx.query.page) || 0
    ctx.query.limit = Number(ctx.query.limit) || 20
    const v = await new PageValidator().validate(ctx)
    let payload = v.data.query
    let res = await adminService.getSystemUserlist(payload)
    if (res) {
      ctx.body = successResponse('获取用户列表成功', res)
    }
  }
}

module.exports = new AdminController()
