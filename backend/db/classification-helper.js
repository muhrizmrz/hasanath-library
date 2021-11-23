const { response } = require('express')
const { resolve, reject } = require('promise')
const db = require('../config/connection')

module.exports = {
    addClassification: (classification_number, classification_name) => {
        return new Promise(async (resolve, reject) => {
            const isAvailable = await db.get().collection('classification').findOne({ classificationNumber: Number(classification_number) })
            if (!isAvailable) {
                if (classification_number.length > 3) {
                    var firstSummary = classification_number.charAt(0) + '00'
                    firstSummary = parseInt(firstSummary, 10)
                    var secondSummary = classification_number.charAt(0) + classification_number.charAt(1) + '0'
                    secondSummary = parseInt(secondSummary, 10)
                    var thirdSummary = classification_number.substring(0, 3)
                    thirdSummary = parseInt(thirdSummary, 10)
                    classification_number = Number(classification_number)
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
                        classification_number = Number(classification_number)
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
                        classification_number = Number(classification_number)
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

                        classification_number = Number(classification_number)
                        console.log(classification_number)
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
                        $lookup: {
                            from: 'classification',
                            localField: 'firstSummary',
                            foreignField: 'classificationNumber',
                            as: 'firstSummaryDetails'
                        }
                    },{
                        $lookup: {
                            from: 'classification',
                            localField: 'secondSummary',
                            foreignField: 'classificationNumber',
                            as: 'secondSummaryDetails'
                        }
                    },{
                        $lookup: {
                            from: 'classification',
                            localField: 'thirdSummary',
                            foreignField: 'classificationNumber',
                            as: 'thirdSummaryDetails'
                        }
                    }
                ]).toArray()
                //console.log(searchNumber)
                if(searchNumber){
                    resolve(searchNumber)
                }else{
                    resolve({error:true,msg:"No result found"})
                }
                
            } else {
                const searchName = await db.get().collection('classification').aggregate([
                    {
                        $match:{
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
                    },{
                        $lookup: {
                            from: 'classification',
                            localField: 'secondSummary',
                            foreignField: 'classificationNumber',
                            as: 'secondSummaryDetails'
                        }
                    },{
                        $lookup: {
                            from: 'classification',
                            localField: 'thirdSummary',
                            foreignField: 'classificationNumber',
                            as: 'thirdSummaryDetails'
                        }
                    }
                ]).toArray()
                if(searchName){
                    resolve(searchName)
                }else{
                    resolve({error:true,msg:"No result found"})
                }
            }
            //const searchNumber = await db.get().collection('classification').findOne({classificationNumber:keyword})
            //const searchName = await db.get().collection('classification').find({ $text: { $search: keyword}}).toArray()
            //console.log(searchName)
            //resolve(searchName)
        })
    },
    searchChildClassifications:(classification_number)=>{
        return new Promise(async(resolve,reject)=>{
            classification_number = parseInt(classification_number,10)
            var findSummary = await db.get().collection('classification').findOne({classificationNumber:classification_number})
            if(findSummary.summary == "first summary"){
                var findChild = await db.get().collection('classification').find({
                    $and:[
                        {firstSummary:classification_number},
                        {summary:"second summary"}
                    ]}).toArray()
                console.log(findChild)
                resolve(findChild)
            }else if(findSummary.summary == "second summary"){
                var findChild = await db.get().collection('classification').find({
                    $and:[
                        {secondSummary:classification_number},
                        {summary:"third summary"}
                    ]}).toArray()
                console.log(findChild)
                resolve(findChild)
            }else if(findSummary.summary == "third summary"){
                var findChild = await db.get().collection('classification').find({
                    $and:[
                        {thirdSummary:classification_number},
                        {summary:"decimal summary"}
                    ]}).toArray()
                console.log(findChild)
                resolve(findChild)
            }
            
            
        })
    }
}
