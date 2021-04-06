const Mongoose = require('mongoose')
// 建立连接
Mongoose.connect('mongodb://localhost:27017/mongo-demo',{
  useCreateIndex: true,
  useUnifiedTopology:true,
  useNewUrlParser: true
})

// 测试连接
Mongoose.connection.on('on',()=>{
  console.log('mongodb数据库连接成功')
})

module.exports = Mongoose





