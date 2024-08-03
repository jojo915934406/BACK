const express = require('express')

const router = express.Router()

const userInfoHandler = require('../router_handle/userInfo.js')
    //导入expressJOi
const expressJoi = require('@escook/express-joi')

const { name_limit, email_limit } = require('../limit/user.js')

router.post('/uploadAvatar', userInfoHandler.uploadAvatar)

router.post('/bindAccount', userInfoHandler.bindAccount)

router.post('/getUserInfo', userInfoHandler.getUserInfo)

router.post('/changeName', expressJoi(name_limit), userInfoHandler.changeName)

router.post('/changeSex', userInfoHandler.changeSex)

router.post('/changeEmail', expressJoi(email_limit), userInfoHandler.changeEmail)

router.post('/changePassword', userInfoHandler.changePassword)


module.exports = router