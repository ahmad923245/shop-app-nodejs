const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const Product = require('../models/product');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({
    storage: storage,
    // limits: { fileSize: 1000000 }
});

router.post('/addproduct', upload.single('image'), async (req, res) => {

    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: `${req.headers.host}/${req.file.path}`
        });
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});


// get all product from node js mongoose ?
// server.get('/usersList', function(req, res) {
//   User.find({}, function(err, users) {
//     var userMap = {};

//     users.forEach(function(user) {
//       userMap[user._id] = user;
//     });

//     res.send(userMap);  
//   });
// });




//Source: https://stackoverflow.com/questions/14103615


router.get('/getallproducts', (req, res) => {

    Product.find({}, (err, products) => {
        let arr = []
        if (err) {
            return res.status(404).send({ success: false })
        } else {
            products.forEach(item => {
                arr.push(item)
            })
            res.status(200).send({ success: true, list: arr })

        }
    })

})






module.exports = router;
