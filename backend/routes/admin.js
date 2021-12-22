const express = require('express')
const admin = require('../routeFunctions/admin')
const app = express()
const bodyParser = require('body-parser')
const adminRouter = express.Router()
const classificationHelper = require("./../db/classification-helper")
const newArrivals = require('../db/new-arrivals')
const db = require('../config/connection')
const objectId = require('mongodb').ObjectId


adminRouter.post('/api/add-classification',(req,res)=>{
    classificationHelper.addClassification(req.body.classification_number,req.body.classification_name).then((result)=>{
        res.json(result)
    })
})

adminRouter.post('/api/edit-classification',(req,res)=>{
    classificationHelper.editClassification(req.body._id).then((status)=>{
        if(status){
            classificationHelper.addClassification(req.body.classification_number,req.body.classification_name).then((result)=>{
                res.json(result)
            })
        }
    })
})

adminRouter.post('/api/login',(req,res)=>{
    const loginDetails = {
        username: 'admin',
        password: 'pass'
    }
    if(req.body.username == loginDetails.username && req.body.password == loginDetails.password){
        req.session.username = req.body.username
        res.json(true)
    }else{
        res.json(false)
    }
})

adminRouter.get('/api/authorize-admin',(req,res)=>{
    if(req.session.username){
        res.json(true)
    }else {
        res.json(false)
    }
})

adminRouter.get('/api/logout',async(req,res)=>{
    await req.session.destroy()
    res.json(true)
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

adminRouter.get('/api/view-child-classifications',(req,res)=>{
    classificationHelper.searchChildClassifications(req.query.classification_number).then((result)=>{
        res.json(result)
    })
})

adminRouter.get('/api/get-one-classfication',async(req,res)=>{
    const classificationDetails = await db.get().collection('classification').findOne({_id:objectId(req.query._id)})
    res.json(classificationDetails)
})

adminRouter.post('/api/add-new-arrivals',(req,res)=>{
    console.log(req.body)
    newArrivals.addNewArrivals(req.body).then((result)=>{
        res.json(result)
    })
})

adminRouter.get('/api/get-new-arrivals',(req,res)=>{
    newArrivals.getNewArrivals().then((result)=>{
        res.json(result)
    })
})

adminRouter.get('/api/get-main-classification',(req,res)=>{
    classificationHelper.getMainClassification().then((result)=>{

        res.send(result)
    })
})

adminRouter.get('/api/get-ten-classification',(req,res)=>{
    classificationHelper.getSecondSummary(req.query.firstSummary).then((result)=>{
        res.json(result)
    })
})

adminRouter.get('/api/get-child-classifications',(req,res)=>{
    classificationHelper.getChildClassification(req.query.secondSummary).then((result)=>{
        res.send(result)
    })
})
module.exports = adminRouter