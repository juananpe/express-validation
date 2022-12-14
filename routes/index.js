var express = require('express');
var router = express.Router();

const { body, validationResult } = require('express-validator');

const mongojs = require('mongojs')
const db = mongojs('mongodb://localhost:27017/usersdb', ['users'])

function erabiltzaileakBistaratu(res) {
        db.users.find(function (err, users) {
            db.close()
            if (err) {
                console.log(err);
            } else {
                res.render('users', {title: 'Erabiltzaileak', users: users});
            }
        })
}

router.get('/', function(req, res, next) {
  res.redirect('/users');
})

router.get('/user', function(req, res, next) {
    res.redirect('/users');
})

/* GET home page. */
router.get('/users', function(req, res, next) {
  erabiltzaileakBistaratu(res)
});


router.post('/user', function(req, res) {
  const userBerria = {
    izena : req.body.izena,
    abizena: req.body.abizena,
    email: req.body.email
  };

  console.log(userBerria);

  db.users.insert( userBerria, function(err) {
    if (err) {
      console.log(err);
    } else {
        res.redirect('/users');
    }
  })
})

router.get('/user/deleteAll', function(req, res) {
    db.users.remove({}, function(err) {
        if (err) {
        console.log(err);
        } else {
          res.redirect('/users');
        }
    })
})

module.exports = router;
