
<p align="center">
<img src="https://image.yangxiansheng.top/img/undraw_publish_article_icso.png?imagelist" />
</p>
<h1 align="center">Koa framework template(Mongoose redis koa-jwt) </h1>
<p align ="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
    <img src="https://img.shields.io/badge/koa-2.7.0-blue.svg" />
  <img src="https://img.shields.io/badge/jsonwebtoken-8.4.0-blue.svg" />
    <img src="https://img.shields.io/badge/validator-10.11.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D%206.0.0-blue.svg" />
  <img src="https://img.shields.io/badge/npm-%3E%3D%203.0.0-blue.svg" />
  <img src="https://img.shields.io/badge/axios-0.18.0-blue.svg" />
</p>

> Koa framework template

## Getting started

```sh
# clone the Project
git clone https://github.com/251205668/Koa-template.git

# enter the project directory
cd Koa-template

# install dependency
npm install

# develop
npm run dev

# test
Listening the 3000 port

```
## 🌲 Features

- middlewares
  - Global exception handling
  - Simplify Router
  - Stratification is very precise
  - Integrated parameter check
  - `mongoose` orm framework Database framework has been added
  -  `redis` has been added
  - `koa-jwt` has been added
  
## 📂 Structure

- api: define routers
- config: define properties
- core: define util methods
- middlewares: define global middlewares
- models: define sql models
- services: define service process
- validator: define validate params
- static： statric resource
- app.js: Entrance to the file

## 🔏 How to use it

1. configuration `Mongoose.js` connect mongodb,create `Schema`，export `Model`
2. define api routers, edit services
3. use validator to validate params and catch exception

1. app.js
```js
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
  console.log('http listening at port 3000')
})

```

2. define router
```js
const Router = require('koa-router')

const router = new Router({
  prefix:"/v1/public"
})
const PublicService = require('../../services/publicService')


router.get('/getCode',PublicService.getCode)


module.exports = router

```

3. edit service to fix API

```js
class UserService{
  constructor(){}
  async sendEmail(ctx,next){
  // user validator to validate params
  const v = await new SendEmailValidator().validate(ctx)
  const userName = v.get('body.userName')
  const result = await send({
    code:1234,
    expire:moment().add(30,"minutes").format('YYYY-MM-DD HH:mm:ss'),
    email:userName,
    user:'努力中的杨先生'
  })
  ctx.body = {
    code:200,
    message:"邮件发送成功",
    data:result
  }
}

}
```
4. connect redis or mongodb
```js
 const db =await Mongoose.connect('mongodb://localhost:27017/poems',{useNewUrlParser:true,useUnifiedTopology:true})
  if(db){
    console.log('connect Success')
  }
  
  
  
  ---------
  const redis = require('redis')
const options = {
  host: '47.97.180.232',
  port: 8271,
  password: '123456',
  detect_buffers: true,
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection')
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted')
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000)
  }
}


const client = redis.createClient(options)
const setValue = (key, value,time) => {
  if(typeof value === 'undefined'|| value ===null || value === ''){
    return
  }
  if(typeof value === 'string'){
    if(time !== 'undefined'){
      return client.set(key,value,'EX',time)
    }else{
      return client.set(key, value)
    }
  }else if(typeof value === 'object'){
    Object.keys(value).forEach((item)=>{
      return client.hset(key,item,value[item],client.print)
    })
  }
}
const { promisify } = require('util')
const getAsync = promisify(client.get).bind(client)
const getValue = (key) => {
  return getAsync(key)
}
const gethValue= (key)=>{
  const getHAsync = promisify(client.hgetall).bind(client)(key)
  return getHAsync
} 
```






## Enjoy it!
