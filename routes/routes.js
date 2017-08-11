var express = require('express');
var actions = require('../methods/actions');

var router = express.Router();

router.post('/auth', actions.auth);
router.post('/adduser', actions.addNew);
router.get('/', function (req, res) {
  var html = "<ul>\
    <li><a href='/auth/google'>Google</a></li>\
    <li><a href='/logout'>logout</a></li>\
  </ul>";

  // dump the user for debugging
  if (req.isAuthenticated()) {
    html += "<p>authenticated as user:</p>"
    html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
  }
  res.send(html);
});
router.get('/getinfo', actions.getinfo);
router.get('/serverinfo',actions.serverInfo);
router.get('/auth/success',actions.authSuccess);
router.get('/auth/failed',actions.authFailed);
router.get('/auth/logout',actions.authLogout);
router.get('/auth/google',passport.authenticate('google'));
router.get('/auth/google/callback',
    passport.authenticate('google',{failureRedirect: '/auth/failed'}),
    function (req,res){
       actions.authSuccess(req,res);
    }
);
router.get('/jsonSample',actions.jsonSample);
router.get('/jsonSampleEnquiry',actions.jsonSampleEnquiry);
module.exports = router;