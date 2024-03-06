const express = require("express")
const hbs = require("hbs")
const path = require("path")
const bodyParser = require("body-parser")
const Employee = require("./models/Employee")
require("./dbConnect")

const app = express()

const urlEncoder = bodyParser.urlencoded()

app.set("view engine", "hbs")
app.use(express.static(path.join(__dirname, "views/public")))
hbs.registerPartials(path.join(__dirname, "views/partials"))


app.get("/", async (req, res) => {
  var data = await Employee.find()
  res.render("index", { data })
})

app.get("/add", (req, res) => {
  res.render("add", { data: "", show: false })
})

app.post("/add", urlEncoder, async (req, res) => {
  try {
    var data = new Employee(req.body)
    await data.save()
    res.redirect("/")
  }
  catch (error) {
    if (error.errors.name.message)
      res.render("add", { data, error: error.errors.name.message, show: true })
    else if (error.errors.email.message)
      res.render("add", { data, error: error.errors.email.message, show: true })
    else if (error.errors.phone.message)
      res.render("add", { data, error: error.errors.phone.message, show: true })
    else if (error.errors.dsg.message)
      res.render("add", { data, error: error.errors.dsg.message, show: true })
    else if (error.errors.salary.message)
      res.render("add", { data, error: error.errors.salary.message, show: true })
    else
      res.render("add", { data, error: "Internal Server Error", show: true })
  }
})

app.get("/delete/:_id", async (req, res) => {
  await Employee.deleteOne({ _id: req.params._id })
  res.redirect("/")
})

app.get("/update/:_id", async (req, res) => {
  var data = await Employee.findOne({ _id: req.params._id })
  res.render("update", { data: data })
})
app.post("/update/:_id", urlEncoder, async (req, res) => {
  try {
    var data = await Employee.findOne({ _id: req.params._id })
    data.name = req.body.name
    data.email = req.body.email
    data.phone = req.body.phone
    data.dsg = req.body.dsg
    data.salary = req.body.salary
    data.city = req.body.name
    data.state = req.body.state
    await data.save()
    res.redirect("/")
  }
  catch (error) {
    if (error.errors.name)
      return res.render("add", { data, error: error.errors.name.message, show: true })
    else if (error.errors.email)
      return res.render("add", { data, error: error.errors.email.message, show: true })
    else if (error.errors.phone)
      return res.render("add", { data, error: error.errors.phone.message, show: true })
    else if (error.errors.dsg)
      return res.render("add", { data, error: error.errors.dsg.message, show: true })
    else if (error.errors.salary)
      return res.render("add", { data, error: error.errors.salary.message, show: true })
    else
      return res.render("add", { data, error: "Internal Server Error", show: true })
  }
})

app.post("/search", urlEncoder, async (req, res) => {
  try {
    var data = await Employee.find({
      $or: [
        { _id: req.body.search },
        { name: { $regex: `.*${req.body.search}.*`, $options: 'i' } },
        { email: { $regex: `.*${req.body.search}.*`, $options: 'i' } },
        { phone: { $regex: `.*${req.body.search}.*`, $options: 'i' } },
        { dsg: { $regex: `.*${req.body.search}.*`, $options: 'i' } },
        { salary: { $regex: `.*${req.body.search}.*`, $options: 'i' } },
        { city: { $regex: `.*${req.body.search}.*`, $options: 'i' } },
        { state: { $regex: `.*${req.body.search}.*`, $options: 'i' } }
      ]
    })
    res.render("index", { data: data })
  }
  catch (error) {
    console.log(error)
  }
})

app.listen(8000, () => {
  console.log("Server is Running at http://localhost:8000")
})