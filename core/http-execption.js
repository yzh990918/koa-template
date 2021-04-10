class HttpExecption extends Error {
  constructor(msg = '服务器异常', errorCode = 9999) {
    super()
    this.msg = msg
    this.errorCode = errorCode
  }
}

// 定义参数异常
class ParameterException extends HttpExecption {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 400
  }
}

// 禁止访问
class ForbidenException extends HttpExecption {
  constructor(msg, errorCode) {
    super()
    ;(this.msg = msg || '没有权限访问'), (this.errorCode = errorCode || 403)
  }
}

// 404
class NotFoundException extends HttpExecption {
  constructor(msg, errorCode) {
    super()
    ;(this.msg = msg || '找不到资源'), (this.errorCode = errorCode || 404)
  }
}

// 已存在

class AllReadyExistedException extends HttpExecption {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '已存在'
    this.errorCode = errorCode || 10001
  }
}
module.exports = {
  HttpExecption,
  ParameterException,
  ForbidenException,
  NotFoundException,
  AllReadyExistedException,
}
