const express = require('express')
const app = express()
    //导入cors解决跨域
const cors = require('cors')
app.use(cors())

const multer = require('multer')

const upload = multer({ dest: './public/upload' })

app.use(upload.any())

app.use(express.static('./public'))

//引入body-parser
var bodyParser = require('body-parser')
    //当extended为false时，值为数组或字符串，当为ture时，值可以为任意类型
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

const jwtconfig = require('./jwt_config/index.js')
const { expressjwt: jwt } = require('express-jwt')
    // app.use(jwt({
    //     secret: jwtconfig.jwtSecretKey,
    //     algorithms: ['HS256']
    // }).unless({
    //     path: [/^\/api\//]
    // }))

const loginRouter = require('./router/login.js')
const Joi = require('joi')
app.use('/api', loginRouter)

const userRouter = require('./router/userInfo.js')
app.use('/user', userRouter)

//对不符合joi规则的情况进行报错
app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) { return res.cc(err) }
})

app.listen(3000, () => {
    console.log('监听已开启！')
})