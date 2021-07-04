const menuList = require('../Models/Menu');

exports.getMenuItemsByRestId = (req,res) =>{
    const restId = req.params.restId;
    menuList.findById(restId)
    .then(response => {
        res.status(200).json({ message: "Restaurant Fetched Succesfully", restMenus: response })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}
