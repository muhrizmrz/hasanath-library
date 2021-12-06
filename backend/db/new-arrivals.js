const { resolve, reject } = require('promise')
const db = require('../config/connection')

module.exports = {
    addNewArrivals:(book)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('newArrivals').insertOne(book).then((result)=>{
                resolve("new arrialss added")
            })
        })
    },
    getNewArrivals:()=>{
        return new Promise(async(resolve,reject)=>{
            const newArrivals = await db.get().collection('newArrivals').aggregate([
                {
                    $lookup:{
                        from: 'classification',
                        localField: 'classificationNumber',
                        foreignField: 'classificationNumber',
                        as: 'classificationDetails'
                    }
                },{
                    $unwind: '$classificationDetails'
                }
            ]).toArray()
            resolve(newArrivals)
        })
    }
}