const Router = require('koa-router')
const router = new Router({
  prefix: '/admin',
})

const AdminController = require('../../controller/admin')

// 删除指定id用户
router.delete('/user/:id', AdminController.deleteOne)

// 批量删除用户

router.delete('/users', AdminController.deleteUsers)

// 修改用户的信息

router.put('/user', AdminController.updateUser)

// 查找指定id的用户信息

router.get('/user/:id', AdminController.getUserInfo)

// 查找系统用户列表
router.get('/users', AdminController.getsystemUserlist)

module.exports = router
