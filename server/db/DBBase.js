class DBBase {
    constructor(collection) {      
        this.collection = collection
    }

    //获取所有
    getAll() {
        return this.collection
    }

    //添加
    add(item) {
        this.collection.push(item)       
    }

    //删除
    delete(key,value) {
        let index = this.collection.findIndex(it => it[key] == value)
        if (index >= 0) {
            this.collection.splice(index, 1)         
        }
        return true
    }

    //更新
    update(key,item) {
        let index = this.collection.findIndex(it => it[key] == item[key])
        if (index >= 0) {
            this.collection[index] = Object.assign(this.collection[index],item)          
        }
        return true
    }

    //清除
    clear() {
        this.collection.splice(0)     
        return true
    }
    //是否存在
    exist(key,value) {
        return this.collection.findIndex(it => it[key] == value) >= 0
    }    
}

module.exports = DBBase
