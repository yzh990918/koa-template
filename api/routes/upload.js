const Router = require('koa-router')
const router = new Router()

const UploadController = require('../../controller/upload')

const UserController = require('../../controller/user')

// 上传单文件
router.post('/upload', UploadController.uploadFile)

// 上传多文件
router.post('/uploads', UploadController.uploadFiles)

// 更新头像
router.post('/avatar',UserController.updateAvatar)

// 删除一个或者多个文件
router.delete('/upload', UploadController.removeFile)

// 获取指定id文件信息
router.get('/file', UploadController.findFileById)

// 获取当前用户上传文件列表
router.get('/uploads', UploadController.getFileListByUser)

// 获取系统文件列表
router.get('/files', UploadController.getFileList)


module.exports = router
