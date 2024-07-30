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

app.get('/', (req, res) => {
    res.send('第一个简单node项目!')
})

app.listen(port, () => {
    console.log('监听已开启！')
})