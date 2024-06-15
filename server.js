const express = require('express')
const app = express()
const port = 8000
const path = require('path')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const insecureHandlebars = allowInsecurePrototypeAccess(handlebars)

app.use(cookieParser())
app.use(cors())

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, './views/layouts'),
    partialsDir: path.join(__dirname, './views/partials'),
    handlebars: allowInsecurePrototypeAccess(handlebars),
}));
app.set('view engine', 'hbs');
app.set('views', './views');


require("./database/dbConnect")

app.use(express.static('./public/'))
app.use(express.static('./uploads/'))

app.use("/", require(path.join(__dirname, "./routes/webRoutes")))
app.use("/admin/", require(path.join(__dirname, "./routes/adminRoutes")))
app.use("/api/", require(path.join(__dirname, "./routes/apiRoutes")))
app.use("/prd/", require(path.join(__dirname, "./routes/productRoutes")))
app.use("/user/", require(path.join(__dirname, "./routes/userRoutes")))

app.listen(port, () => {
    console.log("Server Started .... " + port)
})