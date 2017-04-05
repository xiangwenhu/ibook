const db = require('./index')
const DBBase = require('./DBBase')

class Book extends DBBase {
    constructor(collection) {
        super(collection)
    }

    search(keyWords) {
        //名字，分类，描述搜索
        let kw = keyWords.toLowerCase()      
        return kw ? this.collection.filter(b => (b.name && b.name.toLowerCase().includes(kw))
            || (b.categories && b.categories.join(',').toLowerCase().includes(kw))
            || (b.description && b.description.toLowerCase().includes(kw))) :this.collection       
    }
}

module.exports = new Book(db.data.books)