const Router = require('koa-router')
const _db_statistics = require('../db/statistics.js')

const router = 	new Router({
    prefix:'/api/statistics'
})

//获取所有书
router.get('/getAll', async (ctx)=>{
   ctx.body = _db_statistics.getAll()
})

module.exports = router