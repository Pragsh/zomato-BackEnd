
const restuarantList = require('../Models/Restuarant');

exports.getRestuarantByCity = (req,res) =>{
    const locationid = req.params.locationid;
    restuarantList.find({location_id : locationid})
    .then(response => {
        res.status(200).json({ message: "Restaurant Fetched Succesfully", restaurants: response })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}

exports.getRestuarantByRestId = (req,res) =>{
    const restId = req.params.restId;
    restuarantList.findById(restId)
    .then(response => {
        res.status(200).json({ message: "Restaurant Fetched Succesfully", restaurant: response })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}


exports.filterRestuarants = (req,res) =>{
    const {location_id, mealtype_id, cuisine, lcost, hcost} = req.body;
    let { sort, page} = req.body;

    sort = sort ? sort : 1;
    page = page ? page : 1;

    const countPerPage = 2;
    
    const startIndex = page * countPerPage - 2;
    const endIndex = page * countPerPage - 1;

    let payload = {};

    if (mealtype_id) {
        payload = { mealtype_id }
    }
    if (mealtype_id && location_id) {
        payload = { mealtype_id, location_id }
    }
    if (mealtype_id && lcost && hcost) {
        payload = {
            mealtype_id,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtype_id && location_id && lcost && hcost) {
        payload = {
            mealtype_id,
            location_id,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }

    if(cuisine != undefined && cuisine.length >0){
        if (mealtype_id  && cuisine) {
            payload = {
                mealtype_id,
                cuisine :{ $all: cuisine },
            }
        }
        if (mealtype_id  && location_id && cuisine) {
            payload = {
                mealtype_id,
                cuisine :{ $all: cuisine },
                location_id
            }
        }
        if (mealtype_id && lcost && hcost && cuisine) {
            payload = {
                mealtype_id,
                cuisine :{ $all: cuisine },
                min_price: { $lte: hcost, $gte: lcost }
            }
        }
        if (mealtype_id && location_id&& lcost && hcost && cuisine) {
            payload = {
                mealtype_id,
                cuisine :{ $all: cuisine },
                location_id,
                min_price: { $lte: hcost, $gte: lcost }
            }
        }

    }
   
    


    restuarantList.find(payload).sort({min_price : sort})
    .then(response => {
        const filteredResponse = response.slice(startIndex, endIndex+1);
        let noOfPages;
        if(response.length % countPerPage == 0){
             noOfPages =response.length / countPerPage;
        }
        if(response.length % countPerPage !== 0){
            noOfPages =response.length / countPerPage +0.5 ;
       }
       let hasMorePage = false;
       if(page < noOfPages){
         hasMorePage = true;
       }
        res.status(200).json({ message: "Restaurant Fetched Succesfully",noOfPages : noOfPages, nextPage: hasMorePage, restaurants: filteredResponse})
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}