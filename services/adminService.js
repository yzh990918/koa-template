const User = require('../models/user')
const {NotFoundException} = require('../core/http-execption')
const bcrypt = require('bcryptjs')
class AdminService {
  constructor(){}
  async deleteOne(id){
    try {
     const user = await User.findById(id)
     if(!user){
      throw new NotFoundException('找不到该用户')
    }else{
      return await User.findByIdAndRemove(id)
    }
    } catch (error) {
      // 这里查询id有点特殊需要传入符合规范的id 不然会报错，如果报错则捕获异常
      throw new NotFoundException('找不到该用户')
    }
  }
// 批量删除
  async deleteUsersByIds(ids) {
    try {
      const users = await User.find({_id:{$in: ids}})
      if(!users.length){
        throw new NotFoundException('寻找用户时发生错误')
      }else{
        return await User.remove({_id:{$in: ids}})
      }
    } catch (error) {
      throw new NotFoundException('寻找用户时发生错误')
    }
  }
// 更新用户信息
  async updateUserInfo(payload){
    try {
      const user = await User.findById(payload.id)
      if(!user){
        throw new NotFoundException('用户不存在')
      }else{
        delete payload.id
        const sault = bcrypt.genSaltSync(10)
        payload.password = bcrypt.hashSync(payload.password,sault) 
        return await User.updateOne(payload)
      }
    } catch (error) {
      throw new NotFoundException('寻找用户时发生错误')
    }
  }

   // 获取用户信息
   async getUserInfo(id) {
     try {
       // 需要过滤密码
       const user = await User.findOne({_id:id},{password: 0})
       if(user){
         return user
       }else{
         throw new NotFoundException('寻找用户时发生错误')
       }
     } catch (error) {
      throw new NotFoundException('寻找用户时发生错误')
     }
   }

   // 获取系统用户列表
   async getSystemUserlist(payload) {
     let page = payload.page
     let limit = payload.limit
     let res = {}
     let total = await User.count()
     let list = await User.find({},{password:0}).skip(page * limit).limit(limit)
     res = {
       total,
       page,
       limit,
       list
     }
     return res
   }
}

module.exports = new AdminService()
