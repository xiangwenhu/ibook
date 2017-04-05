const Router = require('koa-router')
const db = require('../db/index.js')
const mime = require('mime')
const fs = require('fs')
const path = require('path')
const czip = require('../utils/czip')
const moment = require('moment')

const router = new Router({
    prefix: '/api/common'
})

//获取所有分类
router.get('/sync', async (ctx) => {
    db.sync()
    ctx.body = {
        status: true,
        code: 10000
    }
})

router.get('/export/config', async (ctx) => {
    let file = __dirname + '/../IBook.json',
        mimetype = await mime.lookup(file)
    ctx.type = mimetype
    ctx.body = fs.createReadStream(file)
    ctx.attachment(file)
})


router.get('/export/books', async (ctx) => {
    let srcDir = db.data.path,
        destDir = db.data.epath,
        destFilename = moment(new Date()).format('YYYY-MM-DD'),
        dest = path.join(destDir, `IBook_${destFilename}.zip`),        
        resultFilename = await czip.zipFolder(srcDir, dest)
    let mimetype = await mime.lookup(resultFilename)
    ctx.type = mimetype
    ctx.body = fs.createReadStream(resultFilename)
    ctx.attachment(resultFilename)
})

router.post('/upload', async (ctx) => {

    let file = ctx.request.files.files,
        basePath = db.data.path

    if (file) {
        if (fs.existsSync(path.join(basePath, file.name))) {
            ctx.body = {
                url: file.name,
                status: true
            }
        } else {
            let tempPath = file.path,
                stream = fs.createWriteStream(path.join(basePath, file.name))
            fs.createReadStream(tempPath).pipe(stream)
            ctx.body = {
                url: file.name,
                status: true
            }
        }

    } else {
        ctx.body = {
            status: false
        }
    }

})

module.exports = router