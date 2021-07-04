require('dotenv').config();
const formidable = require('formidable');
const https = require('https');
const PaytmChecksum = require('./PaytmCheckSum');
const orderController = require('../Controller/orderHistory');

exports.payment = (req, res) => {
    const {amount, email, orderId} = req.body
    let totalAmount = JSON.stringify(amount);
    var params = {};

        params['MID'] = process.env.PAYTM_MID,
        params['WEBSITE'] = process.env.PAYTM_WEBSITE,
        params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
        params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
        params['ORDER_ID'] = orderId,
        params['CUST_ID'] = process.env.PAYTM_CUST_ID,
        params['TXN_AMOUNT'] = totalAmount,
        params['CALLBACK_URL'] = 'https://zomatobackendapp.herokuapp.com/callback',
        params['EMAIL'] = email,
        params['MOBILE_NO'] = process.env.MOBILE_NUMBER


        
    var paytmChecksum = PaytmChecksum.generateSignature(params, process.env.PAYTM_MERCHANT_KEY);
    paytmChecksum.then(function (checksum) {
        let paytmParams = {
            ...params,
            "CHECKSUMHASH": checksum
        }
        res.json(paytmParams)
    }).catch(function (error) {
        console.log(error);
    });
}

exports.callback= (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {
        paytmChecksum = fields.CHECKSUMHASH;
        delete fields.CHECKSUMHASH;

        var isVerifySignature = PaytmChecksum.verifySignature(fields, process.env.PAYTM_MERCHANT_KEY, paytmChecksum);
        if (isVerifySignature) {
            var paytmParams = {};
            paytmParams["MID"] = fields.MID;
            paytmParams["ORDERID"] = fields.ORDERID;

            /*
            * Generate checksum by parameters we have
            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
            */
            PaytmChecksum.generateSignature(paytmParams, process.env.PAYTM_MERCHANT_KEY).then(function (checksum) {
                paytmParams["CHECKSUMHASH"] = checksum;

                var post_data = JSON.stringify(paytmParams);
                var options = {
                    hostname: 'securegw-stage.paytm.in',
                    port: 443,
                    path: '/order/status',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });
                    post_res.on('end', function () {
                        response = JSON.parse(response);
                        if (response.STATUS == "TXN_SUCCESS") {
                            let isOrderUpdated = orderController.updateOrder(fields.ORDERID);
                            console.log("isOrderUpdated", isOrderUpdated);
                            res.sendFile(__dirname + '/response.html', {orderId :fields.ORDERID});
                            
                        }
                        else {
                            res.sendFile(__dirname + '/failure.html');
                        }
                    });
                });
                post_req.write(post_data);
                post_req.end();
            });
        } else {
            console.log("Checksum Mismatched");
        }
    })
}
