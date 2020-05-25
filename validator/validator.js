const { LinValidator, Rule } = require('../core/lin-validator-v2')

class SendEmailValidator extends LinValidator{
  constructor(){
    super()
    this.userName = [
      new Rule('isEmail','请输入邮箱格式的用户名')
    ]
  }
}

class SidValidator extends LinValidator{
  constructor(){
    super()
    this.sid = [
      new Rule('isLength','不符合规范',{min:4})
    ]
  }
}

// //  注册校验
// class RegisterValidator extends LinValidator {
//   constructor (){
//     super()
//     //  四个参数 email password1 password2 nickname
//     this.email = [
//       new Rule('isEmail','邮箱格式不正确')
//     ] 
//     this.password1 = [
//       new Rule('matches','密码至少六位,并且需要包含特殊字符 大写字母 小写字母 数字','/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/')
//     ]
//     this.password1 = this.password2
//     this.username = [
//       new Rule('isLength','昵称不符合规范',{min:4,max:32})
//     ]
//   }

//   //  自定义函数 校验重复密码输入
//   validatePassword(params){
//     //  Linvalidator 自定义函数可以拿到所有参数  params.body.v1 body参数
//     const psw1 = params.body.password1
//     const psw2 = params.body.password2
//     if(psw1 !== psw2){
//       throw new Error('两次密码输入不相同哦')
//     }
//   }
//   async validateEmail(params){
//     //  校验邮箱的唯一性
//     const email = params.body.email
//     //  sequlize查询eamil的数据 Model的操作方法都是返回Pormise
//     const user = await User.findOne({
//       where:{
//         email:email
//       }
//     })
//     if(user){
//       throw new Error('该邮箱已存在,请重新输入')
//     }

//   }
//   async validateUserName(params){
//     const userName = params.body.username
//     const user = await User.findOne({
//       where:{
//         username:userName
//       }
//     })
//     if(user){
//       throw new Error('用户名已存在')
//     }
//   }
// }

module.exports = { SendEmailValidator,SidValidator}
