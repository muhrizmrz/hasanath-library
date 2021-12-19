const { response } = require('express')
const { resolve, reject } = require('promise')
const db = require('../config/connection')

module.exports = {
    addClassification: (classification_number, classification_name) => {
        return new Promise(async (resolve, reject) => {
            const isAvailable = await db.get().collection('classification').findOne({ classificationNumber: Number(classification_number) })
            //console.log(Number(classification_number))
            if (!isAvailable) {
                var firstSummary = classification_number.charAt(0) + '00'
                var secondSummary = classification_number.charAt(0) + classification_number.charAt(1) + '0'
                var thirdSummary = classification_number.substring(0, 3)
                var decimalSummary = classification_number.substring(0, 5)
                if (classification_number.length == 6) {
                    db.get().collection('classification').insertOne({
                        classificationNumber: classification_number,
                        classificationName: classification_name,
                        firstSummary: firstSummary,
                        secondSummary: secondSummary,
                        thirdSummary: thirdSummary,
                        decimalSummary: decimalSummary,
                        summary: "double decimal summary"
                    }).then((result) => {
                        console.log("added")
                        resolve("double decimal summary added")
                    })
                } else if (classification_number.length > 3) {
                    db.get().collection('classification').insertOne({
                        classificationNumber: classification_number,
                        classificationName: classification_name,
                        firstSummary: firstSummary,
                        secondSummary: secondSummary,
                        thirdSummary: thirdSummary,
                        summary: "decimal summary"
                    }).then((result) => {
                        resolve("decimal summary added")
                    })
                } else {
                    if (classification_number.charAt(2) == '0' && classification_number.charAt(1) == '0') {
                        db.get().collection('classification').insertOne({
                            classificationNumber: classification_number,
                            classificationName: classification_name,
                            summary: "first summary"
                        }).then((result) => {
                            resolve("first summary added")
                        })
                    } else if (classification_number.charAt(2) == 0) {
                        db.get().collection('classification').insertOne({
                            classificationNumber: classification_number,
                            classificationName: classification_name,
                            firstSummary: firstSummary,
                            summary: "second summary"
                        }).then((result) => {
                            resolve("second summary added")
                        })
                    } else if (classification_number.charAt(2) != 0) {
                        db.get().collection('classification').insertOne({
                            classificationNumber: classification_number,
                            classificationName: classification_name,
                            firstSummary: firstSummary,
                            secondSummary: secondSummary,
                            summary: "third summary"
                        }).then((result) => {
                            resolve("third summary added")
                        })
                    }
                }
            } else {
                resolve({ msg: "already available", error: true })
            }
        })
    },
    viewClassification: () => {
        return new Promise(async (resolve, reject) => {
            const collection = await db.get().collection('classification').find().toArray()
            resolve(collection)
        })
    },
    searchClassification: (keyword) => {
        return new Promise(async (resolve, reject) => {
            const searchName = await db.get().collection('classification').aggregate([
                {
                    $match: {
                        $text: {
                            $search: keyword
                        }
                    }
                }, {
                    $lookup: {
                        from: 'classification',
                        localField: 'firstSummary',
                        foreignField: 'classificationNumber',
                        as: 'firstSummaryDetails'
                    }
                }, {
                    $lookup: {
                        from: 'classification',
                        localField: 'secondSummary',
                        foreignField: 'classificationNumber',
                        as: 'secondSummaryDetails'
                    }
                }, {
                    $lookup: {
                        from: 'classification',
                        localField: 'thirdSummary',
                        foreignField: 'classificationNumber',
                        as: 'thirdSummaryDetails'
                    }
                }, {
                    $lookup: {
                        from: 'classification',
                        localField: 'decimalSummary',
                        foreignField: 'classificationNumber',
                        as: 'decimalSummaryDetails'
                    }
                }
            ]).toArray()
            if (searchName) {
                resolve(searchName)
            } else {
                resolve({ error: true, msg: "No result found" })
            }
        })
    },
    searchChildClassifications: (classification_number) => {
        return new Promise(async (resolve, reject) => {
            var findSummary = await db.get().collection('classification').findOne({ classificationNumber: classification_number })
            var summaryDetails, whichSummary
            if (findSummary.summary == "first summary") {
                summaryDetails = "second summary"
                whichSummary = {
                    firstSummary: classification_number
                }
            } else if (findSummary.summary == "second summary") {
                summaryDetails = "third summary"
                whichSummary = {
                    secondSummary: classification_number
                }
            } else if (findSummary.summary == "third summary") {
                summaryDetails = "decimal summary"
                whichSummary = {
                    thirdSummary: classification_number
                }
            } else if (findSummary.summary == "decimal summary") {
                summaryDetails = "double decimal summary"
                whichSummary = {
                    decimalSummary: classification_number
                }
            } else {
                summaryDetails = ''
                whichSummary = {
                    decimalSummary: ' '
                }
            }
            var findChild = await db.get().collection('classification').find({
                $and: [
                    whichSummary,
                    { summary: summaryDetails }
                ]
            }).toArray()
            const searchNumber = await db.get().collection('classification').aggregate([
                {
                    $match: {
                        classificationNumber: classification_number
                    }
                }, {
                    $lookup: {
                        from: 'classification',
                        localField: 'firstSummary',
                        foreignField: 'classificationNumber',
                        as: 'firstSummaryDetails'
                    }
                }, {
                    $lookup: {
                        from: 'classification',
                        localField: 'secondSummary',
                        foreignField: 'classificationNumber',
                        as: 'secondSummaryDetails'
                    }
                }, {
                    $lookup: {
                        from: 'classification',
                        localField: 'thirdSummary',
                        foreignField: 'classificationNumber',
                        as: 'thirdSummaryDetails'
                    }
                }, {
                    $lookup: {
                        from: 'classification',
                        localField: 'decimalSummary',
                        foreignField: 'classificationNumber',
                        as: 'decimalSummaryDetails'
                    }
                }
            ]).toArray()
            if (findChild.length != 0) {
                resolve({ classificationData: searchNumber, childData: findChild })
            } else {
                resolve({ classificationData: searchNumber })
            }
        })
    },
    getMainClassification: () => {
        return new Promise(async (resolve, reject) => {
            var classification = await db.get().collection('classification').find({ summary: "first summary" }).sort({ classificationNumber: 1 }).toArray()
            resolve(classification)
        })
    },
    getSecondSummary: (summary) => {
        return new Promise(async (resolve, reject) => {
            var result = await db.get().collection('classification').aggregate([
                {
                    $match: {
                        $and: [
                            { summary: 'second summary' },
                            { firstSummary: summary}
                        ]
                    }
                }
            ]).sort({classificationNumber: 1}).toArray()
            resolve(result)
        })
    },
    getChildClassification:(classificationNumber)=>{
        return new Promise(async(resolve,reject)=>{
            var result = await db.get().collection('classification').aggregate([
                {
                    $match: {
                        $and: [
                            {secondSummary: classificationNumber}
                        ],
                        $or:[
                            {summary: 'third summary'},
                            {summary: 'decimal summary'},
                            {summary: 'double decimal summary'}
                        ]
                    }
                }
            ]).sort({classificationNumber: 1}).toArray()
            resolve(result)
        })
    }
}
