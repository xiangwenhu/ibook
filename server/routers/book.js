const Router = require('koa-router')
const _db_book = require('../db/book.js')
const mime = require('mime')
const db = require('../db')
const fsex = require('../utils/fsex')
const path = require('path')
const fs = require('fs')

const router = new Router({
  prefix: '/api/book'
})

//获取所有分类
router.get('/getAll', async (ctx) => {
  ctx.body = _db_book.getAll()
})

//添加分类
router.post('/add', async (ctx) => {
  let book = ctx.request.fields
  if (!_db_book.exist('name', book.name)) {
    _db_book.add(book)
    ctx.body = {
      status: true
    }
  } else {
    ctx.body = {
      status: false,
      code: 55555
    }
  }
})

//删除
router.post('/delete/:name', async (ctx) => {
  _db_book.delete('name', ctx.params.name)
  ctx.response.status = 200
  ctx.body = {
    status: true
  }
})

//全部删除
router.post('/clear', async (ctx) => {
  _db_book.clear()
  ctx.body = {
    status: true
  }
})

//更新分类
router.post('/update', async (ctx) => {
  _db_book.update('name', ctx.request.fields)
  ctx.body = {
    status: true
  }
})

//检查分类是否存在
router.get('/check/:name', async (ctx) => {
  ctx.body = {
    status: _db_book.exist('name', ctx.params.name)
  }
})


//搜索
router.get('/search/', async (ctx)=>{
  ctx.body = _db_book.search('')
})

router.get('/search/:keyWords', async (ctx)=>{
  ctx.body = _db_book.search(ctx.params.keyWords)
})

//查阅电子书
router.get('/view/:name', async (ctx) => {

  console.log(ctx.params.name)
  let fileName = ctx.params.name,
    filePath = path.join(db.data.path, fileName)
  //fileStats = fs.statSync(filePath)
  //mimetype = await mime.lookup(filePath)  

  /*
  ctx.type = 'application/pdf'
  ctx.set('Content-Disposition', 'inline;filename=' + fileName)
  //ctx.set('Content-Length',fileStats.size)
  ctx.body = fs.createReadStream(filePath) */


  // 内存全部读取  
  ctx.type = 'application/pdf'
  ctx.set('Content-Disposition', 'inline;filename=' + encodeURIComponent(fileName))
  ctx.body = await fsex.readFile(filePath)
})

module.exports = router