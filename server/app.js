let //path = require('path'),
  Koa = require('koa'),
  app = new Koa(),
  serve = require('koa-static'),
  fs = require('fs'),
  path = require('path'),
  //http2 = require('http2'),
  http2 = require('https'),
  routes = require('./routers'),
  //bodyparser  = require('koa-bodyparser'),
  //routes = require('./routes'),  
  bodyparser = require('koa-better-body'),
  privateKey = fs.readFileSync(path.join(__dirname + '/cert/private.pem'), 'utf8'),
  certificate = fs.readFileSync(path.join(__dirname + '/cert/file.crt'), 'utf8'),
  credentials = { key: privateKey, cert: certificate }

require('./db/index.js')
// Send static files
app.use(serve('./client/dist'))

app.use(async (ctx, next) => {
  await next()
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type')
})


//bodyparser
app.use(bodyparser({
  files:true,
  formLimit :'100M' 
}))

//模板
//app.use(views(path.resolve(__dirname,'../dist')))

//自定义错误处理
app.use(async (ctx, next) => {
  try {
    await next()
    if (ctx.status === 404) {
      ctx.body = '404'
    }
  } catch (err) {
    let status = err.status || 500
    ctx.body =  {
      status:status,
      message:'服务器内部错误'
    }
    console.log(err)
  }
})

// x-response-time
app.use(async function (ctx, next) {
  const start = new Date()
  await next()
  const ms = new Date() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

//logger
app.use(async function (ctx, next) {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// 这一行代码一定要在最后一个app.use后面使用
var server = http2.createServer(credentials, app.callback())

//加载所有用户数据

//路由
routes(app)

//异常
app.on('error', (err, ctx) => {
  console.log('error url:' + ctx.url)
  console.log('error detail:' + err)
  console.log('error stack:' + err.stack)
})

server.listen(8082)