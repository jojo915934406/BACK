const express = require('express')

const router = express.Router()

const loginHandler = require('../router_handle/login.js')
    //导入expressJOi
const expressJoi = require('@escook/express-joi')
    //导入验证规则
const { login_limit } = require('../limit/login.js')

router.post('/register', expressJoi(login_limit), loginHandler.register)

router.post('/login', expressJoi(login_limit), loginHandler.login)

module.exports = router