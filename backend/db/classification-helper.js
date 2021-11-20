const { response } = require('express')
const { resolve, reject } = require('promise')
const db = require('../config/connection')

module.exports = {
    addClassification: (classification_number, classification_name) => {
        return new Promise(async (resolve, reject) => {
            const isAvailable = await db.get().collection('classification').findOne({ classificationNumber: parseInt(classification_number, 10) })
            if (!isAvailable) {
                if (classification_number.charAt(2) == '0' && classification_number.charAt(1) == '0') {
                    classification_number = parseInt(classification_number, 10)
                    db.get().collection('classification').insertOne({
                        classificationNumber: classification_number,
                        classificationName: classification_name,
                        summary: "first summary"
                    }).then((result) => {
                        resolve("first summary added")
                    })
                } else if (classification_number.charAt(2) == 0) {
                    var firstSummary = classification_number.charAt(0) + '00'
                    firstSummary = parseInt(firstSummary, 10)
                    classification_number = parseInt(classification_number, 10)
                    db.get().collection('classification').insertOne({
                        classificationNumber: classification_number,
                        classificationName: classification_name,
                        firstSummary: firstSummary,
                        summary: "second summary"
                    }).then((result) => {
                        resolve("second summary added")
                    })
                } else if (classification_number.charAt(2) != 0) {
                    var firstSummary = classification_number.charAt(0) + '00'
                    firstSummary = parseInt(firstSummary, 10)
                    var secondSummary = classification_number.charAt(0) + classification_number.charAt(1) + '0'
                    secondSummary = parseInt(secondSummary, 10)
                    console.log(secondSummary)
                    classification_number = parseInt(classification_number, 10)
                    db.get().collection('classification').insertOne({
                        classificationNumber: classification_number,
                        classificationName: classification_name,
                        firstSummary: firstSummary,
                        secondSummary: secondSummary,
                        summary: "third summary"
                    }).then((result) => {
                        resolve("third summary added")
                    })
                } else if (classification_number.length > 3) {
                    var firstSummary = classification_number.charAt(0) + '00'
                    firstSummary = parseInt(firstSummary, 10)
                    var secondSummary = classification_number.charAt(0) + classification_number.charAt(1) + '0'
                    secondSummary = parseInt(secondSummary, 10)
                    var thirdSummary = classification_number.substring(0, 3)
                    thirdSummary = parseInt(thirdSummary, 10)
                    db.get().collection('classification').insertOne({
                        classificationNumber: classification_number,
                        classificationName: classification_name,
                        firstSummary: firstSummary,
                        secondSummary: secondSummary,
                        thirdSummary: thirdSummary,
                        summary: "third summary"
                    }).then((result) => {
                        console.log("decimal summary added")
                    })
                }
            } else {
                resolve({msg:"already available",error:true})
            }
        })
    },
    viewClassification: () => {
        return new Promise(async (resolve, reject) => {
            const collection = await db.get().collection('classification').find().toArray()
            //console.log(collection)
            resolve(collection)
        })
    },
    searchClassification: (keyword) => {
        return new Promise(async (resolve, reject) => {
            if (!isNaN(keyword)) {
                keyword = parseInt(keyword, 10)
                //const searchNumber = await db.get().collection('classification').find({ classificationNumber: keyword }).toArray()
                const searchNumber = await db.get().collection('classification').aggregate([
                    {
                        $match: {
                            classificationNumber: keyword
                        }
                    },{
                        $lookup:{
                            from:'classification',
                            localField:'firstSummary',
                            foreignField: 'classificationNumber',
                            as:'firstSummaryDetails'
                        }
                    }
                ]).toArray()
                console.log(searchNumber)
                
                resolve(searchNumber)
            } else {
                const searchName = await db.get().collection('classification').find({ $text: { $search: keyword } }).toArray()
                resolve(searchName)
            }
            //const searchNumber = await db.get().collection('classification').findOne({classificationNumber:keyword})
            //const searchName = await db.get().collection('classification').find({ $text: { $search: keyword}}).toArray()
            //console.log(searchName)
            //resolve(searchName)
        })
    }
}
