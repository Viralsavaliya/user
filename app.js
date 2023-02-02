require('dotenv').config();
require('./config/db')
const express = require('express');
const app = express()
const port = process.env.port || 3000
const routes = require('./routes/index')
// const cookieParser = require('cookie-parser');
// const session = require('express-session')


app.use(express.json({ limit: "50mb" }))

// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false, sameSite: true, maxAge: 1000 * 60 * 60 * 24 * 7 }
// }))
// app.use(cookieParser())


app.use('/api', routes)


app.listen(port, () => {
    console.log(`server started successfully ${port}`)
})