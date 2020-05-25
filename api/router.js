const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore(app) {
    // Home file
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.LoadConfig()
  }
  static initLoadRouters() {
    const path = `${process.cwd()}/api/v1`
    requireDirectory(module, path, {
      visit: whenLoadModule
    })
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }
  static LoadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }
}

module.exports = InitManager
