const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000
const { mogoUrl } = require('./keys')


require('./models/User');

const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes')
const catRoutes = require('./routes/Category.Route')
const productRoutes = require('./routes/productRoute')
app.use(bodyParser.json())
app.use(authRoutes)
app.use(catRoutes)
app.use(productRoutes)
app.use(cors('*'))




app.use('/uploads', express.static('./uploads'));



mongoose.connect(mogoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("connected to mongo yeahh")
})

mongoose.connection.on('error', (err) => {
    console.log("this is error", err)
})



app.get('/', requireToken, (req, res) => {
    res.send({ email: req.user.email })
})

app.listen(PORT, () => {
    console.log("server running " + PORT)
})