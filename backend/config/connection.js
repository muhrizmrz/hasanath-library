const mongoClient = require('mongodb').MongoClient

const state = {
    db: null
}

module.exports.connect = function(done){
    const url = process.env.MY_MONGO_URI
    const dbName = 'dhic-library'
    mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db = data.db(dbName)
    })
    
    done()
}
module.exports.get = function(){
    return state.db
}
