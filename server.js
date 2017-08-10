var mongoose = require('mongoose');
    express = require('express');
    cors = require('cors');
    morgan = require('morgan');
    config = require('./config/authconfig');
    passport = require('passport');
    routes = require('./routes/routes');
    bodyParser = require('body-parser');

var allowAcrossDomain = function(req,res,next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
    // if ('OPTIONS' == req.method) {
    //     res.send(200);
    // }
    // else {
    //     next();
    // }
}
    

mongoose.connect(config.database);

mongoose.connection.on('open', function(){
    console.log('Mongo is connected');
    var app = express();
    app.use(allowAcrossDomain);
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    require('./config/passport')(passport);
    app.use(routes);
    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    });
    app.listen(3333, function(){
        console.log('server is running');
    })
})

