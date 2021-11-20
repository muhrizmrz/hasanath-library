const express = require('express')
const admin = require('../routeFunctions/admin')
const app = express()
const adminRouter = express.Router()
const classificationHelper = require("./../db/classification-helper")

adminRouter.post('/api/add-classification',(req,res)=>{
    classificationHelper.addClassification(req.body.classification_number,req.body.classification_name).then((result)=>{
        res.json(result)
    })
})

adminRouter.get('/api/view-classification',(req,res)=>{
    classificationHelper.viewClassification().then((result)=>{
        res.json(result)
    })
})

adminRouter.get('/api/search-classification',(req,res)=>{
    classificationHelper.searchClassification(req.query.keyword).then((result)=>{
        res.json(result)
    })
})

module.exports = adminRouter