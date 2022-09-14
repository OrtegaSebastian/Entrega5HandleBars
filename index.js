const express = require('express');
const fs = require('fs')
const handlebars = require('express-handlebars')
const app = express()
const port = 8080;
const productsRouter = require('./products')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

//HandleBars
const hbs = handlebars.engine({
  extname: '.hbs',
  layoutsDir: __dirname + "/views",

})
app.engine("hbs", hbs);

// configuraciones
// app.set("views", "./views");
// app.set("view engine", "hbs");

// app.engine(
//   "hbs",
//   handlebars({
//     extname: ".hbs",
//     layoutsDir: "views/layouts",
//     defaultLayout: "index",
//     partialsDir: __dirname + "/views/partials", // Codigo estatico como el footer y header
//   })
// );


app.use('/productos/', productsRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


