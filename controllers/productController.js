const productModelLib = require('../model/productModel')

exports.saveProduct = (req, res) => {
    // console.log(req.body)
    const newProduct = new productModelLib({
        productname: req.body.productname,
        productprice: req.body.productprice,
        productimage: req.file.filename,
    });
    newProduct.save().then((data) => {
        console.log(data)
        console.log("Product Saved ....")
        res.send(200)
        // res.render('admin/home')
    }).catch((err) => {
        console.log("Product Not Saved ...." + err)
        res.send(404)
    })
}

exports.saveProductJSON = (req, res) => {
    const newProduct = new productModelLib({
        productname: req.body.productname,
        productprice: req.body.productprice,
        productimage: req.file.filename,
    });
    newProduct.save().then((data) => {
        console.log(data)
        console.log("Product Saved ....")
        res.send(200)
    }).catch((err) => {
        console.log("Product Not Saved ...." + err)
        res.send(404)
    })
}

exports.editProduct = (req, res) => {
    console.log(req.body._id)
    var filter = { _id: req.body._id }
    productModelLib.updateMany(filter, {
        productname: req.body.productname,
        productprice: req.body.productprice,
        productimage: req.file.filename,
    }).then((data) => {
        console.log(data)
        console.log("Product Updated ....")
        res.sendStatus(200)
    }).catch((err) => {
        console.log("Product Not Updated ...." + err)
        res.sendStatus(404)
    })
}

exports.showAllProducts = (req, res) => {
    productModelLib.find().then((data) => {
        // res.send(data)
        res.render('admin/showprd', { prdData: data });
    }).catch((err) => {
        res.send(err)
    })
}

exports.showAllProductsJSON = (req, res) => {
    productModelLib.find().then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
}

exports.showProducts = (req, res) => {
    if (req.params.id) {
        res.send("<h1>Find Product:  " + req.params.id + "</h1>")
    } else {
        res.send("<h1>Show All Products</h1>")
    }
}

exports.findProduct = (req, res) => {
    productModelLib.findOne({ _id: req.params.id }).then((data) => {
        // res.send(data)
        res.render('admin/addprd', { prdData: data });
    }).catch((err) => {
        res.send(err)
    })
}

exports.findProductbyID_JSON = (req, res) => {
    productModelLib.findOne({ _id: req.params.id }).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
}

exports.findProductbyName_JSON = (req, res) => {
    productModelLib.findOne({ productname: req.body.productname }).then((data) => {
        if (data) {
            res.send(data)
        } else {
            res.send(404)
        }
    }).catch((err) => {
        res.send(err)
    })
}

exports.deleteProduct = (req, res) => {
    var filter = { _id: req.params.id }
    productModelLib.deleteMany(filter).then((data) => {
        console.log(data)
        console.log("Product Deleted....")
        res.render('home')
        res.send(200)
    }).catch((err) => {
        console.log("Product Not Found ...." + err)
        res.send(404)
    })
}