const fs = require('fs')

let filePath = __dirname + '/../IBook.json',
    IBook = JSON.parse(fs.readFileSync(filePath)),
    validator = {
        set: function (target, property, value) {
            target[property] = value
            return true
        }
    }

global.IBook = new Proxy(IBook, validator)

//数据同步到文件
const syncData = () => {
    fs.writeFile(filePath, JSON.stringify(global.IBook), err => {
        if (err) {
            console.log(err)
        }
    })
}

//默认五分钟个同步
setImmediate(syncData,1000*5*60)

module.exports = {
    data:global.IBook,
    sync:syncData
}