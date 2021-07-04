let Users = require('../Models/SignUp');

exports.registerUser = (req,res) =>{
    const {userName ,email, password} = req.body;
    const user = new Users({userName ,email, password});

    user.save().then(response =>
        res.status(200).json({ message : "User Added successfully", user : response})
    ).catch(err => {
        res.status(500).json({ message: "Error", error: err })
    })
}

exports.verifyUser = (req,res) =>{
    const email = req.body.email;
    console.log(email);
    Users.find({email : email})
    .then(response => {
        res.status(200).json({ message: "User History", user: response })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}

