const db = require('../db/index.js')
const bcrypt = require('bcryptjs')
    //导入jwt，用于生成token
const jwt = require('jsonwebtoken')
    //导入jwt配置文件，用于加密和解密
const jwtconfig = require('../jwt_config/index.js')

exports.register = (req, res) => {
    const reginfo = req.body
    if (!reginfo.account || !reginfo.password) {
        return res.send({
            status: 1,
            message: '账号或密码不能为空'
        })
    }
    //判断账号是否已存在
    const sql = 'select * from users where account = ?'
    db.query(sql, reginfo.account, (err, results) => {
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '账号已存在'
            })
        }
        //对密码进行加密
        //10是加密后的长度
        reginfo.password = bcrypt.hashSync(reginfo.password, 10)
            //把账号密码插入到users里面
        const sql1 = 'insert into users set ?'
            //注册身份
        const identity = '用户'
            //创建时间
        const create_time = new Date()
        db.query(sql1, {
            account: reginfo.account,
            password: reginfo.password,
            identity,
            create_time,
            //初始未冻结状态为0
            status: 0
        }, (err, results) => {
            if (results.affectedRows != 1) {
                return res.send({
                    status: 1,
                    message: '注册失败'
                })
            }
            res.send({
                status: 0,
                message: '注册成功'
            })
        })
    })
}

exports.login = (req, res) => {
    const loginfo = req.body
    const sql = 'select * from users where account = ?'
    db.query(sql, loginfo.account, (err, results) => {
        //执行sql语句失败的情况  一般在数据库断开的情况下会执行失败
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败')
            //对前端传过来的密码进行解密
        const compareResult = bcrypt.compareSync(loginfo.password, results[0].password)
            //比较不通过
        if (!compareResult) return res.cc('登录失败')
        if (results[0].status == 1) return res.cc('账号被冻结')
            //返回前端token
        const user = {
            ...results[0],
            password: '',
            imageUrl: '',
            create_time: '',
            update_time: ''
        }

        const tokenStr = jwt.sign(user, jwtconfig.jwtSecretKey, {
            expiresIn: '7h'
        })
        res.send({
            results: results[0],
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })
    })
}