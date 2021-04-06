const koa = require('koa')
const koaBody = require('koa-body')
const exception = require('./middlewares/execption')
const app = new koa()
const path = require('path')
const statics = require('koa-static')
const cors = require('@koa/cors')
const JWT = require('koa-jwt')
const config = require('./config/config')

app.use(cors())
app.use(exception)
// 静态服务
app.use(statics(path.join(__dirname,'./static')))
// 这里需要配置不需要鉴权的路由
app.use(JWT({ secret: config.JWT_SECRET }).unless({ path: [/^\/user\/register/,/^\/user\/login/] }));

//  文件上传相关配置
app.use(koaBody({
  multipart: true,
  formidable: {
    keepExtension: true,
    maxFiledSize: 5 *1024 * 1024 // 最大的体积
  },
  onError: err=>{
    console.log('koabody tcl:err',err)
  }
}))

// 启动服务
const InitManager = require('./api/router')
InitManager.initCore(app)
app.listen(3000, () => {
  console.log('http监听端口3000')
})
