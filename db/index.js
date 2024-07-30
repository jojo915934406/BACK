const mysql = require('mysql')

//创建与数据库的连接
const db = mysql.createPool({
    host: 'localhost',
    user: 'back_system',
    password: 'mjl915934406',
    database: 'back_system'
})

module.exports = db