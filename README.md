<p align="center">
  <a href="https://github.com/251205668/koa-template">
    <img src="https://image.yangxiansheng.top/img/20210410234539.png?imglist">
  </a>
</p>

  <a href="https://github.com/251205668/koa-template/issues">
    <img src="https://img.shields.io/github/issues/251205668/koa-template.svg" alt="Github issues">
  </a>
  <a href="https://github.com/251205668/koa-template/network">
    <img src="https://img.shields.io/github/forks/251205668/koa-template.svg" alt="Github Forks">
  </a>
  <a href="https://github.com/251205668/koa-template/stargazers">
    <img src="https://img.shields.io/github/stars/251205668/koa-template.svg" alt="Github Stars">
  </a>
  <a href="https://github.com/251205668/koa-template/releases">
    <img src="https://img.shields.io/github/release/251205668/koa-template.svg" alt="Github Releases">
  </a>
</p>

基于 `koa2` 的 Restful API 模板，用于快速继承开发 `koa` 前后端分离的后端。

> 前提说明: 
> 1. 本项目需要有 `koa` 的基础，不熟悉的同学可以查看 [koa官方文档](https://www.koajs.com.cn/)
> 2. 本项目需要有 `mongodb` 和 `mongoose`，不熟悉的同学可以查看 [mongdb官方文档](https://docs.mongodb.com/)，[mongoose官方文档](http://mongoosejs.net/)
3. 拉下来项目之后需要切换至 `mongodb` 分支

### 特性:

- ⏱ 基于 koa2 开发
- ♻️ 基于 Mongoose 存储数据
- 📚 基于 JWT AUTH 认证方式，支持重刷认证
- 📄 基于 winstom 日志系统功能
- 🚀 全局异常处理，特定异常抛出，统一接口返回标准，内置通用用户系统，内置通用文件系统，支持参数校验，内置分页器
- ⛑  提供 API 接口文档，内置接口文档地址：[postman 接口文档](https://documenter.getpostman.com/view/10611320/TzCV3PuZ)，[直接导入postman](postman://app/collections/import/10611320-d7d0f575-5b09-4e20-a3cd-83bff0244073-TzCV34xY?referrer=https%3A%2F%2Fdocumenter.getpostman.com%2Fview%2F10611320%2FTzCV34xY%231119f58a-9ea6-45f6-a467-9334e167980f&versionTag=latest#?)


## 内置功能

-  🧑‍ 用户系统
    - 注册
    - 登录
    - 更新用户信息
    - 修改当前用户密码
    - 删除指定用户
    - 删除批量用户
    - 获取当前登录用户信息
    - 获取指定用户信息
    - 获取系统用户列表
- 📁 文件系统
    - 上传单文件
    - 上传批量文件
    - 删除一个或者批量文件
    - 获取指定文件信息
    - 获取当前用户上传文件列表
    - 获取系统文件列表
- ✔️ 校验系统
    - 校验 token 有效性
    - 解析 token 的 payload
    - 拦截非法 token
## 安装

```bash
# clone
git clone https://github.com/251205668/koa-template

# install dependencies
npm install

# install nodemon
npm install -g nodemon 

```
## 配置和运行

1. 首先本地需要安装 `mongodb` ,并且本地 `mongodb` 服务器已开启

2. 修改 `config/Mongoose.js` 在这里改成本地的 `mongodb` 服务器地址即可

3. 检查是否连接成功

4. 运行服务，如果端口被占用，更改 `app.js` 的端口地址即可，另外更改端口时需要同时修改 `config/config.js` 的 `baseUrl` 配置

```bash
npm run dev
```

5. 在 `postman` 测试你的接口

![](https://image.yangxiansheng.top/img/20210411004243.png?imglist)

## 调试

这里讲一下在 `vscode` 中如何调试本项目

1. 点下左侧爬虫图标，选择创建 `.launch.json`

2. 替换以下内容

```json
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "启动程序",
      "program": "${workspaceFolder}/app.js"
    }
  ]
}

```

3. 给需要调试处打上断点，按下 `F5`,发送请求就会自动进入调试


## 快速上手

下面基于内置用户系统进行讲解

**1. 编写模板**

在 `models` 目录下新建 `user.js`

```js
const Mongoose = require('../config/Mongoose')

// userSchema
const Schema = Mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Mongoose.model('User', UserSchema)
```

**2. 编写 controller 层**

以注册用户为例,
```js
class UserController {
  constructor() {}
  // 注册
  async register(ctx, next) {
  }
}
module.exports = new UserController()
```
编写参数校验器，在 `validator/validator.js` 下加一条校验规则

> 校验器基于 [validator.js](https://github.com/validatorjs/validator.js) 开发，规则详情请参考：[validator 规则](https://github.com/validatorjs/validator.js#validators),每个参数字段传入规则数组，每个规则接受三个参数：`规则`，`抛出异常文案`，`附带操作`

```js
class RegisterValidator extends LinValidator {
  constructor() {
    super()
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
module.exports = { RegisterValidator }
```

加入校验器校验参数，提取参数

```js
class UserController {
  constructor() {}
  // 注册
  async register(ctx, next) {
    // 参数校验 可在validator.js定义
    const v = await new RegisterValidator().validate(ctx)
    // 接受参数
    /**
     * query 参数 : v.data.query
     * body 参数  :  v.data.body
     * param 参数 :  v.data.path
     * */
    const payload = v.data.body || {}
  }
}
```

**2. 完成 Service 层**

```js
const bcrypt = require('bcryptjs')
class UserService {
  constructor() {}
  // 注册
  async register(payload) {
    // 是否已经注册
    const user = await User.findOne({ username: payload.username })
    let comparePassword = payload.password === payload.repassword
    if (user) {
      throw new AllReadyExistedException('用户已注册')
    }
    if (!comparePassword) {
      throw new ParameterException('重复密码不相同哦')
    }
    // 判断重复密码是否和密码相同
    else {
      // 加密 默认盐为10
      const sault = bcrypt.genSaltSync(10)
      payload.password = bcrypt.hashSync(payload.password, sault)
      return await User.create(payload)
    }
  }
}
```

**3. 完善 Controller 层**

```js
class UserController {
  constructor() {}
  async register(ctx, next) {
    const v = await new RegisterValidator().validate(ctx)
    const payload = v.data.body || {}
    const res = await userService.register(payload)
    if (res) {
      ctx.body = successResponse('用户注册成功')
    }
  }
}
module.exports = new UserController()
```

**4. 编写 Router 层**

在 `api/routes` 下新建 `user,js`

```js
const Router = require('koa-router')
const router = new Router({
  // 设置路由前缀
  prefix: '/user'
})
// 注入controller层
const UserController = require('../../controller/user')
// 注册
router.post('/register',UserController.register)
module.exports = router
```

**5. 检查是否需要配置不需要JWT校验路由**

此处注册不需要 `JWT` 校验，所以需要修改 `app.js` 匹配规则

```js
app.use(JWT({ secret: config.JWT_SECRET })
.unless({ path: [/^\/user\/register/] }))
```

**大功告成了！调试下接口吧，没问题耶！**

![](https://image.yangxiansheng.top/img/20210411011352.png?imglist)


## 项目目录说明

```bash
koa-template
├── api
│   ├── router.js  // 路由
│   └── routes
│       ├── admin.js
│       ├── upload.js
│       └── user.js
├── app.js         // 主路口
├── config         // 配置文件
│   ├── config.js
│   └── Mongoose.js 
├── controller     // controller层
│   ├── admin.js
│   ├── upload.js
│   └── user.js
├── core           // 内置核心文件
│   ├── http-execption.js
│   ├── lin-validator-v2.js
│   ├── success.js
│   └── util.js
├── HttpCode.md    // 错误码规范
├── LICENSE
├── middlewares    // 异常处理文件
│   └── execption.js
├── models         // 模型
│   ├── attachment.js
│   └── user.js
├── package.json
├── README.md
├── services       // service层
│   ├── adminService.js
│   ├── uploadService.js
│   └── userService.js
├── static         // 静态资源目录
│   ├── 2021-04-10
│   │   ├── 10098411-77ab-4d27-a77c-002fac24717a.png
│   │   └── 73ef83fc-31b7-4420-b4c0-3ff5478147ea.png
│   └── test.png
├── util
│   └── token.js
└── validator     // 校验器
    └── validator.js
```

## TODO

- [ ] 内置 swagger 文档
- [ ] 文件系统支持 `oss` 上传
- [ ] 开发适配 `sequelize` 的 koa 模板
- [ ] 使用 `TypeScript` 重构该项目
- [ ] 开发 `nestjs` 版模板
## 参与贡献

欢迎提交 [Pull Request](https://github.com/251205668/koa-template/pulls) 或者和我z直接交流

## License

[MIT © 墨痕](./LICENSE)
