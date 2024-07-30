const express = require('express')
const app = express()
const port = 3000
    //导入cors解决跨域
const cors = require('cors')
app.use(cors())
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
})

const jwtconfig = require('./jwt_config/index.js')
const { expressjwt: jwt } = require('express-jwt')
app.use(jwt({
    secret: jwtconfig.jwtSecretKey,
    algorithms: ['HS256']
}).unless({
    path: [/^\/api\//]
}))

const loginRouter = require('./router/login.js')
app.use('/api', loginRouter)

//对不符合joi规则的情况进行报错
const Joi = require('joi')
app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) return res.cc(err)
})

app.listen(port, () => {
    console.log('监听已开启！')
})