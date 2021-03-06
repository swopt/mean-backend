var sql = require('mssql');
var jwt = require('jwt-simple');

var dbConfig = {
    server: 'dbserv',
    database: 'FISMAF313GST',
    user: 'fisdbadmin',
    password: 'fis159',
    options: {
        instanceName: 'sql2k8',
        trustedConnection: true
    }
}

var functions = {
    getPrgs: function(req,res){
       new sql.ConnectionPool(dbConfig).connect().then(pool => {
            return pool.request().query("select * from prg_profile where subs_code != 'SY' order by subs_code,prg_type,prg_name")
            }).then(result => {
                let rows = result.recordset
                var prgtrees = new Prgtrees(rows);
                res.status(200).json(prgtrees);
                sql.close();
            }).catch(err => {
                console.log('Database connection error. Using predefined program list.')
                var prgprof = require('../dummy/json/prgprof.json');
                res.status(200).json(prgprof);
                sql.close();
            });
    }
}

class Prgtrees {
    constructor(data) {
        this.data = data;
    }
}

module.exports = functions;