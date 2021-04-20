const { LinValidator, Rule } = require('../core/lin-validator-v2')

class RegisterValidator extends LinValidator {
  constructor() {
    super()
    // 参数校验，可传入数组类型校验
    this.username = [
      new Rule('isLength', '用户名长度必须大于3并且小于20', {
        min: 3,
        max: 20,
      }),
    ]
    this.repassword = [
      new Rule('matches', '必须为数字和字母的组合', /^[A-Za-z0-9]+$/),
    ]
    this.password = [
      new Rule('matches', '必须为数字和字母的组合', /^[A-Za-z0-9]+$/),
    ]
  }
}

class LoginValidator extends LinValidator {
  constructor() {
    super()
    // 参数校验，可传入数组类型校验
    this.username = [
      new Rule('isLength', '用户名长度必须大于3并且小于20', {
        min: 3,
        max: 20,
      }),
    ]
    this.password = [
      new Rule('matches', '必须为数字和字母的组合', /^[A-Za-z0-9]+$/),
    ]
  }
}

class PasswordValidator extends LinValidator {
  constructor() {
    super()
    this.newPassword = [
      new Rule('matches', '必须为数字和字母的组合', /^[A-Za-z0-9]+$/),
    ]
    this.renewPassword = [
      new Rule('matches', '必须为数字和字母的组合', /^[A-Za-z0-9]+$/),
    ]
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.token = [new Rule('isLength', '不能为空', { min: 1 })]
  }
}

class IdValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule('isLength', '不能为空', { min: 1 })]
  }
}

class UserValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule('isLength', '不能为空', { min: 1 })]
    this.username = [
      new Rule('isLength', '用户名长度必须大于3并且小于20', {
        min: 3,
        max: 20,
      }),
    ]
    this.password = [
      new Rule('matches', '必须为数字和字母的组合', /^[A-Za-z0-9]+$/),
    ]
  }
}

class PageValidator extends LinValidator {
  constructor() {
    super()
    this.page = [
      new Rule('isOptional', 0),
      new Rule('isInt', '参数必须为正整数', { min: 0 }),
    ]
    this.limit = [
      new Rule('isInt', '参数不能超过30', { min: 1, max: 30 }),
      new Rule('isOptional', 20),
    ]
  }
}

module.exports = {
  RegisterValidator,
  LoginValidator,
  TokenValidator,
  IdValidator,
  UserValidator,
  PageValidator,
  PasswordValidator,
}
