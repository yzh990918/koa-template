const koa = require('koa')
const parser = require('koa-bodyparser')
const exception = require('./middlewares/execption')
const app = new koa()
const path = require('path')
const statics = require('koa-static')
const cors = require('@koa/cors')
const JWT = require('koa-jwt')
const config = require('./config/config')

app.use(cors())
app.use(exception)
app.use(JWT({ secret: config.JWT_SECRET }).unless({ path: [/^\/v1\/public/] }));


const InitManager = require('./api/router')
InitManager.initCore(app)
app.use(parser())
app.use(statics(path.join(__dirname,'./static')))
app.listen(3000, () => {
  console.log('http监听端口3000')
})
