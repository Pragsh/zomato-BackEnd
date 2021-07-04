
const mealtype = require('../Models/MealType');

exports.getMealTypes = (req,res) =>{
    mealtype.find()
    .then(response => {
        res.status(200).json({ message: "Availaible Meal Types : ", mealtypes: response })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}