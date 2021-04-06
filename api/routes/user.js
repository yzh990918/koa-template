const Router = require('koa-router')
const router = new Router({
  // 设置路由前缀
  prefix: '/user'
})

// 注入controller层
const UserController = require('../../controller/user')

// 注册
router.post('/register',UserController.register)

// 登录
router.post('/login',UserController.login)

module.exports = router
