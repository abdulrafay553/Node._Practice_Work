const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniquename = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // const fileExtension = file.originalname.split('.').pop();
        const newname = uniquename + '-' + file.originalname
        cb(null, newname)
    },
})

const upload = multer({ storage: storage });

const jsonparser = bodyParser.json();
const urlendcoded = bodyParser.urlencoded({ extended: false });

const ProductController = require('../controllers/productController');
const OrderController = require('../controllers/orderController');

router.get("/showprd", urlendcoded, ProductController.showAllProductsJSON);
router.post('/saveprd', [urlendcoded, upload.single('productimage')], ProductController.saveProduct);

router.post("/findprd", urlendcoded, ProductController.findProductbyName_JSON);
router.get("/findprdid/:id", urlendcoded, ProductController.findProductbyID_JSON);

router.post("/saveorder", urlendcoded, OrderController.saveOrderJSON);

module.exports = router;