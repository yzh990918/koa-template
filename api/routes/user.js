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

// 验证token是否有效

router.get('/verify',UserController.verify)

// 更改密码
router.put('/repassword',UserController.updatePwd)

// 获取当前登录用户信息

router.get('/getUserInfo',UserController.getUserInfo)

module.exports = router
