module.exports = {
    database: 'mongodb://localhost:27017/fisauth',
    secret: 'f1s4uth',
    google : {
        clientID : '928730025981-2078ulndaf9qi67e52kbs1qkchv0aqul.apps.googleusercontent.com',
        clientSecret : 'gAuGN6rt6_btC2ayozPkx1Ll',
        callbackURL : 'http://localhost:3333/auth/google/callback',
        scope: 'https://www.googleapis.com/auth/plus.login'
    }
};