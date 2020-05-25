// 1.接收参数 校验
const Router = require('koa-router')
const router = new Router({
  //  定义前缀
  prefix:'/v1/user'
})

const UserService =require('../../services/userService')
// 找回密码 发送邮箱

router.post('/sendEmail',UserService.sendEmail)

module.exports = router
