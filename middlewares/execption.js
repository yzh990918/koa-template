const { HttpExecption } = require('../core/http-execption')
// 定义全局异常中间件
const eception = async (ctx, next) => {
  try {
    await next()
   // 处理请求404异常
    if (ctx.status === 404) {
      ctx.body = {
        msg: '请求路由不存在',
        code: 404,
        request: `${ctx.method} ${ctx.path}`,
      }
    }
  } catch (error) {
    const IsHttpexecption = error instanceof HttpExecption
    // 校验token
    if (error.status == 401) {
      ctx.body = {
        msg: 'token令牌不合法',
        code: 401,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = 401
    } else {
      // 如果是Http已知异常
      if (IsHttpexecption) {
        ctx.body = {
          msg: error.msg,
          code: error.errorCode,
          request: `${ctx.method} ${ctx.path}`,
        }
        ctx.status = 200
      } else {
        ctx.body = {
          msg: '未知异常发生',
          code: 999,
          request: `${ctx.method} ${ctx.path}`,
        }
        ctx.status = 500
      }
    }
  }
}

module.exports = eception
