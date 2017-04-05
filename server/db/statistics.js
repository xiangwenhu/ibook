const db = require('./index')
const DBBase = require('./DBBase')

class Statistics extends DBBase{
    constructor(collection){
        super(collection)
    }
}
module.exports = new Statistics(db.data.statistics)