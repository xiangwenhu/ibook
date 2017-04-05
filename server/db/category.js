const db = require('./index')
const DBBase = require('./DBBase')

class Category extends DBBase{
    constructor(collection){
        super(collection)
    }
}

module.exports = new Category(db.data.categories)