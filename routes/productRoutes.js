const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonparser = bodyParser.json()
const urlendcoded = bodyParser.urlencoded({ exntended: false})

const ProductsConroller1 = require('../controllers/productController') 

router.get("/", ProductsConroller1.showProducts)
router.get("/:id", ProductsConroller1.showProducts)
router.get("/products", ProductsConroller1.showProducts)
router.get("/products/:id", ProductsConroller1.showProducts)

router.post("/saveproduct", urlendcoded, ProductsConroller1.saveProduct)

module.exports = router
