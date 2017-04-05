const Router = require('koa-router')
const _db_category = require('../db/category.js')

const router = new Router({
  prefix: '/api/category'
})

//获取所有分类
router.get('/getAll', async (ctx) => {
  ctx.body = _db_category.getAll()
})

//添加分类
router.post('/add', async (ctx) => {
  let category = ctx.request.fields
  if (!_db_category.exist('name', category.name)) {
    _db_category.add(category)
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
  _db_category.delete('name', ctx.params.name)
  ctx.response.status = 200
  ctx.body = {
    status: true
  }
})

//全部删除
router.post('/clear', async (ctx) => {
  _db_category.clear()
  ctx.body = {
    status: true
  }
})

//更新分类
router.post('/update', async (ctx) => {
  _db_category.update('name', ctx.request.fields)
  ctx.body = {
    status: true
  }
})

//检查分类是否存在
router.get('/check/:name', async (ctx) => {
  ctx.body = {
    status: _db_category.exist('name', ctx.params.name)
  }
})

module.exports = router