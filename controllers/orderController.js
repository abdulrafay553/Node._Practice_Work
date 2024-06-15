const orderModelLib = require('../model/orderModel')

exports.saveOrderJSON = (req, res) => {
    const newOrder = new orderModelLib(req.body)
    newOrder.save().then((data) => {
        console.log(data)
        console.log("Order Saved ....")
        res.send(200)
    }).catch((err) => {
        console.log("Order Not Saved ...." + err)
        res.send(404)
    })
}
