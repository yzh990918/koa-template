const redis = require('redis')
const options = {
  host: '47.97.180.232',
  port: 8271,
  password: '123456',
  detect_buffers: true,
  // 来自官方
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

// 创建客户端
const client = redis.createClient(options)

// 设置键值方法
const setValue = (key, value,time) => {
  // 除空
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
    // 对象{key1,:value1,key2:value2}
    // hset(key,对象的key,对象的值,client.print)  对象的key可以通过Object.keys(value)获取
    Object.keys(value).forEach((item)=>{
      return client.hset(key,item,value[item],client.print)
    })
  }
}

// 获取键值
const { promisify } = require('util')
const getAsync = promisify(client.get).bind(client)
const getValue = (key) => {
  return getAsync(key)
}

// 获取全部的哈希值
const gethValue= (key)=>{
  const getHAsync = promisify(client.hgetall).bind(client)(key)
  return getHAsync
}

module.exports = {
  setValue,
  client,
  getValue,
  gethValue
}
