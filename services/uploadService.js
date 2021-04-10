const { uploadPath, baseUrl } = require('../config/config')
const moment = require('moment')
const mkdir = require('make-dir')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const attachment = require('../models/attachment')
const {
  ParameterException,
  NotFoundException,
} = require('../core/http-execption')
const path = require('path')
class UploadService {
  // 上传单个文件
  async uploadOneFile(payload) {
    const creatorId = payload.id
    const file = payload.file
    // 扩展名
    const extraName = file.name.split('.')[1]
    // 创建目录
    const dir = `${uploadPath}/${moment().format('YYYY-MM-DD')}`
    await mkdir(dir)

    // 生成唯一的id
    const fileName = uuid()
    // 图片在本地的位置
    const realPath = `${dir}/${fileName}.${extraName}`
    // 最后返回的路径
    const returnPath = `${moment().format(
      'YYYY-MM-DD'
    )}/${fileName}.${extraName}`
    const url = `${baseUrl.development}/${returnPath}`
    // 读写文件
    const reader = fs.createReadStream(file.path)
    const upStream = fs.createWriteStream(realPath)
    reader.pipe(upStream)
    try {
      // 存入数据
      const res = await attachment.create({
        fileName,
        extraName,
        creatorId,
        path: returnPath,
      })
      if (res) {
        return {
          fileName,
          url,
          extraName,
        }
      }
    } catch (error) {
      throw new ParameterException('上传文件失败')
    }
  }

  // 删除某个文件
  async destroyOneFile(id) {
    try {
      const currentAttachment = await attachment.findById(id)
      if (!currentAttachment) {
        throw new NotFoundException('文件不存在')
      }
      // 实际删除文件的路径
      const realPath = path.join(
        process.cwd(),
        uploadPath,
        currentAttachment.path
      )
      fs.unlinkSync(realPath)
      // 数据表删除文件
      return await attachment.findByIdAndRemove(id)
    } catch (error) {
      throw new ParameterException('删除失败')
    }
  }

  // 获取指定文件信息
  async getFileInfoById(id) {
    try {
      const currentAttachment = await attachment.findById(id)
      if (!currentAttachment) {
        throw new NotFoundException('文件不存在')
      }
      return {
        fileName: currentAttachment.fileName,
        url: `${baseUrl.development}/${currentAttachment.path}`,
        extraName: currentAttachment.extraName,
      }
    } catch (error) {
      throw new ParameterException('寻找文件异常')
    }
  }

  // 获取当前登录用户文件列表
  async getLoginedFilelist(payload) {
    const { id, page, limit } = payload
    let res = {}
    try {
      let total = await attachment.count({ creatorId: id })
      let fileList = await attachment
        .find({ creatorId: id }, { creatorId: 0 })
        .skip(page * limit)
        .limit(limit)
      for (let file of fileList) {
        file.path = `${baseUrl.development}/${file.path}`
      }
      res = {
        total,
        page,
        limit,
        fileList,
      }
      return res
    } catch (error) {
      throw new ParameterException('获取用户文件列表失败')
    }
  }
  // 获取文件列表
  async getSystemFileList(payload) {
    try {
      const { page, limit } = payload
      let res = {}
      let total = await attachment.count()
      let fileList = await attachment
        .find()
        .skip(page * limit)
        .limit(limit)
      for (let file of fileList) {
        file.path = `${baseUrl.development}/${file.path}`
      }
      res = {
        total,
        page,
        limit,
        fileList,
      }
      return res
    } catch (error) {
      throw new ParameterException('获取文件列表失败')
    }
  }
}

module.exports = new UploadService()
