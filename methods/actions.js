var User = require('../model/user');
var config = require('../config/authconfig');
var jwt = require('jwt-simple');

var functions = {
    auth: function(req, res) {
        /**
        User.findOne({
            name: req.body.name
        }, function(err, user){
            if (err) {console.log(err);throw err};
            
            if(!user) {
                res.status(403).send({success: false, msg: 'Authentication failed, User not found'});
            }
            
           else {
                user.comparePassword(password, function(err, isMatch){
                    if(isMatch && !err) {
                        var token = jwt.encode(user, config.secret);
                        res.json({success: true, token: token});
                    } else {
                        return res.status(403).send({success: false, msg: 'Authenticaton failed, wrong password.'});
                    }
                })
            }
            
        })*/
    },
    authSuccess: function(req,res) {
        return res.json({authSuccess:true,user:req.user,msg: 'Google authentication successful'});
    },
    authFailed: function(req,res) {
        return res.json({authSuccess:false,msg: 'Authentication Failed'});
    },
    authLogout: function(req,res) {
        req.logout();
        res.redirect('/');
    },
    addNew: function(req, res){
        if((!req.body.name) || (!req.body.password)){
            console.log(req.body.name);
            console.log(req.body.password);
            
            res.json({success: false, msg: 'Enter all values'});
        }
        else {
            var newUser = User({
                name: req.body.name,
                password: req.body.password
            });
            
            newUser.save(function(err, newUser){
                if (err){
                    res.json({success:false, msg:'Failed to save'})
                }
                
                else {
                    res.json({success:true, msg:'Successfully saved'});
                }
            })
        }
    },
    getinfo: function(req, res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1];
            var decodedtoken = jwt.decode(token, config.secret);
            return res.json({success: true, msg: 'hello '+decodedtoken.name});
        }
        else {
            return res.json({success:false, msg: 'No header'});
        }
    },
    serverInfo: function(req,res){
        return res.json({success:true,msg: 'FIS Authentication Server'});
    },

    jsonSample: function(req, res){
        var json = require('../dummy/json/template.json');
        return res.send(json);
    },
    jsonSampleEnquiry: function(req, res){
        var json = require('../dummy/json/enquiry_sample.json');
        return res.send(json);
    }
    
}

module.exports = functions;
