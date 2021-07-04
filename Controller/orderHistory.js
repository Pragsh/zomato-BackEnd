let orderData = require('../Models/orderHistory');

exports.saveOrder = (req, res) =>{
    const {restId ,restName, items,date, orderId, total, userId, status} = req.body;
    const orderHistory = new orderData({restId ,restName, items,date, orderId, total, userId, status});

    orderHistory.save().then(response =>
        res.status(200).json({ message : "order History saved successfully", orderHistory : response})
    ).catch(err => {
        res.status(500).json({ message: "order History NOT Inserted Succesfully", error: err })
    })

}

exports.updateOrder = (orderId) =>{
    console.log("id", orderId.toString());
    orderData.find({orderId : orderId}).then(response => {
        console.log("response", response);
        const{ items, restId, restName, date, total, userId, orderId} =response[0];
 
        orderData.updateOne( {orderId:orderId}, 
                             {items, orderId, restId, restName, date, total, status : 'SUCCESS', userId}, 
                             function (err, docs) {
                                if (err){
                                    console.log(err)
                                }
                                else{
                                    console.log("Updated Docs : ");
                                    return true;
                                }
                            }
                            )
    }).catch(err => {
        console.log(err); 
    })
}

exports.fetchOrderByUser = (req, res) =>{
    const userId = req.params.user;
    console.log(userId);
    orderData.find({userId : userId})
    .then(response => {
        res.status(200).json({ message: "Order History", orders: response })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}