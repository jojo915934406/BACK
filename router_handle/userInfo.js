const db = require('../db/index.js')

const bcrypt = require('bcryptjs')

const crypto = require('crypto')

fs = require('fs')

exports.uploadAvatar = (req, res) => {
    // 生成唯一标识
    const onlyId = crypto.randomUUID()
    let oldName = req.files[0].filename;
    let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8')
    fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName)
    const sql = 'insert into image set ?'
    db.query(sql, {
        image_url: `http://127.0.0.1:3000/upload/${newName}`,
        onlyId
    }, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            onlyId,
            status: 0,
            url: 'http://127.0.0.1:3000/upload/' + newName
        })
    })
}

exports.bindAccount = (req, res) => {
    const { account, onlyId, url } = req.body
    const sql = 'update image set account = ? where onlyId = ?'
    db.query(sql, [account, onlyId], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows == 1) {
            const sql1 = 'update users set image_url = ? where account = ?'
            db.query(sql1, [url, account], (err, result) => {
                if (err) return res.cc(err)
                res.send({
                    status: 0,
                    message: '修改成功'
                })
            })
        }
    })
}

exports.changePassword = (req, res) => {
    const sql = 'select password from users where id = ?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        const compareResult = bcrypt.compareSync(req.body.oldPassword, results[0].password)
        if (!compareResult) {
            res.send({
                status: 1,
                message: '原密码输入错误'

            })
            return
        }
        const newPassword = bcrypt.hashSync(req.body.newPassword, 10)
        const sql1 = 'update users set password = ? where id = ?'
        db.query(sql1, [newPassword, req.body.id], (err, results) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '修改成功'
            })
        })

    })
}

exports.getUserInfo = (req, res) => {
    const { id } = req.body
    const sql = 'select * from users where id = ?'
    db.query(sql, id, (err, result) => {
        if (err) return res.cc(err)
        res.send(result)
    })
}

exports.changeName = (req, res) => {
    const { id, name } = req.body
    const sql = 'update users set name = ? where id = ?'
    db.query(sql, [name, id], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改成功'
        })
    })
}

exports.changeSex = (req, res) => {
    const { id, sex } = req.body
    const sql = 'update users set sex = ? where id = ?'
    db.query(sql, [sex, id], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改成功'
        })
    })
}

exports.changeEmail = (req, res) => {
    const { id, email } = req.body
    const sql = 'update users set email = ? where id = ?'
    db.query(sql, [email, id], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改成功'
        })
    })
}