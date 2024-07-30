const joi = require('joi')

//账号的验证
const account = joi.string().alphanum().min(6).max(12).required()
    //密码的验证
const password = joi.string().min(6).max(12).required()

exports.login_limit = {
    body: {
        account,
        password
    }
}