/* GET meals view */
const meals = (req, res) => {
    console.log("the meals page in the controller has been reached")
    res.render("meals", { title: "Travlr Getaways" }) 
  }
  module.exports = {
    meals,
  }
  