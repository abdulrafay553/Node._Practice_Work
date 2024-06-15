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
// const upload = multer({ dest: 'uploads/' });

const jsonparser = bodyParser.json();
const urlendcoded = bodyParser.urlencoded({ extended: false });

const ProductController = require('../controllers/productController');

router.get("/", (req, res) => {
    res.render('admin/home');
});

router.get("/addprd", (req, res) => {
    res.render('admin/addprd');
});

router.post('/saveprd', [urlendcoded, upload.single('productimage')], ProductController.saveProduct);
router.get("/showprd", urlendcoded, ProductController.showAllProducts);

router.post('/editprd', [urlendcoded, upload.single('productimage')], ProductController.editProduct);
router.get("/editprd/:id", urlendcoded, ProductController.findProduct);

router.get("/delprd/:id", urlendcoded, ProductController.deleteProduct);

module.exports = router;
