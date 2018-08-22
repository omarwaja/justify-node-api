const express = require('express');
const router = express.Router();
const models = require('./models');
const jwt = require('./utils/jwt.util');
const justify = require('./utils/justify.util');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false,
}));

router.post('/token', (req,res) => {
    const email = req.body.email;
    if (email == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    };
    // checking user existence in the database, if not found ce create new user and provide a token
    models.user.findOne({
        where: { email: email }
    }).then(function (userexist) {
        if(userexist){
            const token = jwt.generateTokenForUser(userexist);
            return res.status(200).json({ user_exist: true, token: token });
        }else{
            const date = new Date();
            models.user.create({
                email: email,
                leftwords: 80000,
                lastreset: date
           }).then(function (user) {
               const token = jwt.generateTokenForUser(user);
               return res.status(200).json({ user_exist: false, user_created: true, token: token });
           }).catch(function (err) {
               return res.status(500).json({ 'error': 'User creation error' });
           });
        }
    }).catch(function (err){
        return res.status(500).json({ 'error': 'User existence checking error' });
    });
});

router.post('/justify', (req,res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(400).send({Error: 'Token input type error'});
    }
    // verifying user token validity
    let user = jwt.verify(token);
    if(!user){
        return res.status(403).send({Error: 'Token incorrect'});
    }
    models.user.findOne({
        where: {id: user.userid}
    }).then(function (user) {
       let day = 60*24*60*1000;
       let currentdate = new Date();
       // reseting user wordperday every 24 hours
       if((currentdate - user.lastreset) > day){
           models.user.update({
               leftwords: 80000,
               lastreset: currentdate,
           }, {
               where: {
                   id: user.id
               }
           });
           req.user.leftwords=80000;
       }

       req.user = user;
       return next();
        }).catch(function (err) {
        return res.status(500).send({Error: 'Error finding user in the database '});
    });
// parsing text content
},(req,res, next)=>{
    let type = req.headers['content-type'];

    if (type != 'text/plain')
        return res.status(400).send({Error: 'Text input type error'});
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        req.text += chunk
    });
    req.on('end',next);
// verifying user wordsperday
},(req,res,next)=>{
   let wordscount = req.text.split(/\b\w+\b/).length-1;
   if( wordscount > req.user.leftwords){
       return res.status(402).send({Error: '402 Payment Required'});
   }
   try {
       models.user.update({
           leftwords: req.user.leftwords - wordscount,
       }, {
           where: {
               id: req.user.id
           }
       });
   }catch(err){
        return res.status(500).send({Error: 'Database update Error '});
    }
    let justified = justify.justify(req.text);

    return res.status(200).send(justified);
});

module.exports = router;