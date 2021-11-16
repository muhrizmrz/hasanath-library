const db = require('../config/connection')

module.exports = {
    addClassification:(classification_number,classification_name)=>{
        return new Promise((resolve,reject)=>{
            if(classification_number.charAt(2) == '0' && classification_number.charAt(1) == '0'){
                classification_number = parseInt(classification_number,10)
                db.get().collection('classification').insertOne({
                    classificationNumber: classification_number,
                    classificationName: classification_name,
                    summary: "first summary"
                }).then((result)=>{
                    resolve("first summary added")
                })
            } else if(classification_number.charAt(2) == 0) {
                classification_number = parseInt(classification_number,10)
                db.get().collection('classification').insertOne({
                    classificationNumber: classification_number,
                    classificationName: classification_name,
                    summary: "second summary"
                }).then((result)=>{
                    resolve("second summary added")
                })
            } else {
                classification_number = parseInt(classification_number,10)
                db.get().collection('classification').insertOne({
                    classificationNumber: classification_number,
                    classificationName: classification_name,
                    summary: "third summary"
                })
            }
        })
    },
    viewClassification:()=>{
        return new Promise(async(resolve,reject)=>{
           const collection = await db.get().collection('classification').find().toArray()
           //console.log(collection)
           resolve(collection)
        })
    }
}
