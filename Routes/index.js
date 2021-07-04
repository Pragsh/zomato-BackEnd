const express = require('express');
const locationController = require('../Controller/location');
const restController = require('../Controller/Restuarant');
const menuItems = require('../Controller/MenuItems');
const userController = require('../Controller/User');
const orderController =require('../Controller/orderHistory');
const paymentGatewayController = require('../Controller/Payment');

const mealTypeController = require('../Controller/MealType');

const router = express.Router();

router.get('/locations',locationController.getLocations);

router.post('/addlocation',locationController.addLocation);

router.get('/restuarantbycity/:locationid',restController.getRestuarantByCity);
router.post('/filter',restController.filterRestuarants);

router.get('/getRestuarantById/:restId',restController.getRestuarantByRestId);

router.get('/mealtypes',mealTypeController.getMealTypes);

router.get('/menuItems/:restId',menuItems.getMenuItemsByRestId);

router.post('/register',userController.registerUser);
router.post('/verify',userController.verifyUser);
router.post('/saveOrder', orderController.saveOrder);


router.get('/fetchOrders/:user',orderController.fetchOrderByUser);
//Payment API

router.post('/payment', paymentGatewayController.payment);
router.post('/callback', paymentGatewayController.callback);

module.exports = router;