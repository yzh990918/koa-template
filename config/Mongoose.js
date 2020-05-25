const Mongoose = require('mongoose')


// 删除一条数据
// ci.remove({'':'5ebe3c8de468cc2157db610b'},(err,res)=>{
//   console.log('删除成功',res)
// })

// ci.find({author:'和岘'},(err,res)=>{
//   console.log(res)
// })

async function query(){
  const db =await Mongoose.connect('mongodb://localhost:27017/poems',{useNewUrlParser:true,useUnifiedTopology:true})
  if(db){
    console.log('连接成功')
  }

const Schema = Mongoose.Schema()

const ci = Mongoose.model('ci',Schema,'ci')
const writer =Mongoose.model('writer',Schema,'writer')

  const result1 = await ci.findById({_id:'5ebe3c8de468cc2157db610b'})
  console.log('ByID:'+result1)

  const result2 = await ci.countDocuments({_id:'5ebe3c8de468cc2157db610b'})
  console.log('count:'+result2)

  const result3 = await ci.findById({_id:'5ebe3c8de468cc2157db610b'},{_id:0})
  console.log('不返回某些值'+result3)

  const result4 = await ci.find({author:{$regex:/和/i}})
  console.log('模糊查询:'+result4)




 const pageSize = 10
 const currentPage = 1
 const sortstr = {'id':0}
 let skipNums = (currentPage-1)*pageSize
 const result5 = await ci.find({id:{$lt:100}}).skip(skipNums).limit(pageSize).sort(sortstr)
 console.log('分页查询:'+result5)

 const result6 = await writer.find({},{_id:0}).skip(skipNums).limit(pageSize)
 console.log(result6)
  
}


query()




