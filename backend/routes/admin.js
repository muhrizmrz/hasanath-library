const express = require('express')
const admin = require('../routeFunctions/admin')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const jwt = require('jsonwebtoken')

const adminRouter = express.Router()
const classificationHelper = require("./../db/classification-helper")
const newArrivals = require('../db/new-arrivals')
const db = require('../config/connection')
const objectId = require('mongodb').ObjectId


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

const verifyJwt = (req, res, next) => {
    const token = req.headers["x-access-token"]
    console.log(token)
    if (!token) {
        res.send("you need to create token")
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                req.session.destroy()
                res.json({admin:false})
            } else {
                req.userId = decoded.username
                next()
            }
        })
    }
}


adminRouter.post('/api/add-classification', verifyJwt ,(req, res) => {
    classificationHelper.addClassification(req.body.classification_number, req.body.classification_name).then((result) => {
        res.json({admin:true,result:result})
    })
})

adminRouter.post('/api/edit-classification', verifyJwt ,(req, res) => {
    classificationHelper.editClassification(req.body._id).then((status) => {
        if (status) {
            classificationHelper.addClassification(req.body.classification_number, req.body.classification_name).then((result) => {
                res.json(result)
            })
        }
    })
})


adminRouter.get('/api/isAdmin', verifyJwt, (req, res) => {
    res.send("you are authenticated")
})

adminRouter.post('/api/login', (req, res) => {
    const loginDetails = {
        username: 'admin',
        password: 'pass'
    }
    if (req.body.username == loginDetails.username && req.body.password == loginDetails.password) {
        req.session.username = req.body.username
        const id = req.body.username
        const token = jwt.sign({ id }, "jwtSecret")
        res.json({ admin: true, token: token })
    } else {
        res.json(false)
    }
})

adminRouter.get('/api/authorize-admin', verifyJwt ,(req, res) => {
    res.json({admin:true})
})

adminRouter.get('/api/logout', async (req, res) => {
    await req.session.destroy()
    res.json(true)
})

adminRouter.get('/api/view-classification', verifyJwt,(req, res) => {
    classificationHelper.viewClassification().then((result) => {
        res.json(result)
    })
})

adminRouter.get('/api/search-classification', (req, res) => {
    classificationHelper.searchClassification(req.query.keyword).then((result) => {
        res.json(result)
    })
})

adminRouter.get('/api/view-child-classifications', (req, res) => {
    classificationHelper.searchChildClassifications(req.query.classification_number).then((result) => {
        res.json(result)
    })
})

adminRouter.get('/api/get-one-classfication', async (req, res) => {
    const classificationDetails = await db.get().collection('classification').findOne({ _id: objectId(req.query._id) })
    res.json(classificationDetails)
})


adminRouter.post('/api/add-new-arrivals',(req,res)=>{
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
   return res.status(200).send(req.file)
 })


adminRouter.get('/api/get-new-arrivals', (req, res) => {
    newArrivals.getNewArrivals().then((result) => {
        res.json(result)
    })
})

adminRouter.get('/api/get-main-classification', (req, res) => {
    classificationHelper.getMainClassification().then((result) => {

        res.send(result)
    })
})

adminRouter.get('/api/get-ten-classification', (req, res) => {
    classificationHelper.getSecondSummary(req.query.firstSummary).then((result) => {
        res.json(result)
    })
})

adminRouter.get('/api/get-child-classifications', (req, res) => {
    classificationHelper.getChildClassification(req.query.secondSummary).then((result) => {
        res.send(result)
    })
})
module.exports = adminRouter