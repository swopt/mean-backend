var mongoose = require('mongoose');
    express = require('express');
    cors = require('cors');
    morgan = require('morgan');
    config = require('./config/authconfig');
    passport = require('passport');
    routes = require('./routes/routes');
    bodyParser = require('body-parser');
    

mongoose.connect(config.database);

mongoose.connection.on('open', function(){
    console.log('Mongo is connected');
    var app = express();
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

