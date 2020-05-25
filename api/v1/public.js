const Router = require('koa-router')

const router = new Router({
  prefix:"/v1/public"
})
const PublicService = require('../../services/publicService')

// 发送验证码
router.get('/getCode',PublicService.getCode)


module.exports = router
