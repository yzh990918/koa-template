const { LinValidator, Rule } = require('../core/lin-validator-v2')

class RegisterValidator extends LinValidator {
  constructor(){
    super()
    
    // 参数校验，可传入数组类型校验
    this.username = [
      new Rule('isLength','用户名长度必须大于3并且小于20',{min:3,max:20})
    ]
    this.repassword = [
      new Rule(
        'matches',
        '必须为数字和字母的组合',
        /^[A-Za-z0-9]+$/
      )
    ];
    this.password = [
      new Rule(
        'matches',
        '必须为数字和字母的组合',
        /^[A-Za-z0-9]+$/
      )
    ];
    
  }
}


class LoginValidator extends LinValidator {
  constructor(){
    super()
    
    // 参数校验，可传入数组类型校验
    this.username = [
      new Rule('isLength','用户名长度必须大于3并且小于20',{min:3,max:20})
    ]
    this.password = [
      new Rule(
        'matches',
        '必须为数字和字母的组合',
        /^[A-Za-z0-9]+$/
      )
    ];
    
  }
}


module.exports = { RegisterValidator, LoginValidator }
