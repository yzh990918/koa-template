const {getValue,setValue,gethValue} =require('./config/RedisConfig')

setValue('key','value')
getValue('key').then((res)=>{
  console.log('getValue:'+res)
})

setValue('testobj',{"username":"马云","password":"123456"})
gethValue('testobj').then((res)=>{
  console.log(JSON.stringify(res,null,2))
})
