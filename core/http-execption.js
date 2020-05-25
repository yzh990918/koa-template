class HttpExecption extends Error {
  constructor(msg = '服务器异常', code = 500, errorCode = 9999) {
    super()
    this.msg = msg
    this.code = code
    this.errorCode = errorCode
  }
}

// 定义参数异常
class ParameterException extends HttpExecption {
  constructor(msg, code, errorCode) {
    super()
    this.msg = msg || '参数错误'
    this.code = 400
    this.errorCode = errorCode || 10000
  }
}


// 禁止访问
class ForbidenException extends HttpExecption{
  constructor(msg,code,errorCode){
    super()
    this.msg = msg || '禁止访问',
    this.code = 403
    this.errorCode = 10001
  }
}


// 404
class NotFoundException extends HttpExecption {
  constructor(msg,code,errorCode){
    super()
    this.msg = msg || '找不到资源',
    this.code = 404
    this.errorCode = 10002
  }
}
module.exports = { HttpExecption, ParameterException , ForbidenException, NotFoundException}
