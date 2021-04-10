const { successResponse } = require('../core/success')
const uploadService = require('../services/uploadService')
const { getTokenPayload } = require('../util/token')
const { IdValidator, PageValidator } = require('../validator/validator')

class UploadController {
  // 上传单个文件
  async uploadFile(ctx) {
    // 默认只允许上传的file key 为file
    const file = ctx.request.files.file
    const AuthHeader = ctx.request.header.authorization
    const tokenPayload = await getTokenPayload(AuthHeader)

    const res = await uploadService.uploadOneFile({
      file,
      id: tokenPayload._id,
    })
    if (res) {
      ctx.body = successResponse('文件上传成功', res)
    }
  }

  // 上传批量文件
  async uploadFiles(ctx) {
    // 获取文件数组
    const files = ctx.request.files.file
    const AuthHeader = ctx.request.header.authorization
    const tokenPayload = await getTokenPayload(AuthHeader)
    const fileList = []
    for (let file of files) {
      const res = await uploadService.uploadOneFile({
        file,
        id: tokenPayload._id,
      })
      fileList.push(res)
    }
    if (fileList.length) {
      ctx.body = successResponse('文件上传成功', {
        fileList,
        fileNums: fileList.length,
      })
    }
  }

  // 删除一个或者多个文件

  async removeFile(ctx) {
    // 获取参数
    const fileIds = ctx.request.query.fileId
    const ids = fileIds.split(',') || []
    for (let id of ids) {
      await uploadService.destroyOneFile(id)
    }
    ctx.body = successResponse('删除文件成功')
  }

  // 获取指定文件信息

  async findFileById(ctx) {
    const v = await new IdValidator().validate(ctx)
    const id = v.data.query.id
    const res = await uploadService.getFileInfoById(id)
    if (res) {
      ctx.body = successResponse('获取文件成功', res)
    }
  }

  // 获取文件列表

  async getFileList(ctx) {
    ctx.query.page = Number(ctx.query.page) || 0
    ctx.query.limit = Number(ctx.query.limit) || 20
    const v = await new PageValidator().validate(ctx)
    const payload = v.data.query
    const res = await uploadService.getSystemFileList(payload)
    if (res) {
      ctx.body = successResponse('获取文件列表成功', res)
    }
  }

  // 获取登录用户文件列表

  async getFileListByUser(ctx) {
    ctx.query.page = Number(ctx.query.page) || 0
    ctx.query.limit = Number(ctx.query.limit) || 20
    const v = await new PageValidator().validate(ctx)
    const payload = v.data.query
    const AuthHeader = ctx.request.header.authorization
    const tokenPayload = await getTokenPayload(AuthHeader)
    payload.id = tokenPayload._id
    const res = await uploadService.getLoginedFilelist(payload)
    if (res) {
      ctx.body = successResponse('获取文件列表成功', res)
    }
  }
}

module.exports = new UploadController()
