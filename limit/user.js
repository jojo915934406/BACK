const joi = require('joi')


const id = joi.required()

const name = joi.string().pattern(/^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/).required()

const email = joi.string().pattern(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).required()

exports.name_limit = {
    body: {
        id,
        name
    }
}

exports.email_limit = {
    body: {
        id,
        email
    }
}