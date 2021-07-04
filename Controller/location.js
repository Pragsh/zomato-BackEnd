const locationData = require('../Models/location');

exports.getLocations = (req,res) =>{
    locationData.find().then(response =>
        res.status(200).json(response)
    ).catch(
        err => err
    );
    
}

exports.addLocation = (req,res) =>{
    
        const {location_Id ,City, city_id,country_name} = req.body;
        const location = new locationData({location_Id ,City, city_id,country_name});

        location.save().then(response =>
            res.status(200).json({ message : "location saved successfully", locations : response})
        ).catch(err => {
            res.status(500).json({ message: "Location Data NOT Inserted Succesfully", error: err })
        })
    
}