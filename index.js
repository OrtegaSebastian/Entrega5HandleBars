const express = require('express');
const fs = require ('fs')
const handlebars = require('express-handlebars')
const app = express()
const port = 8080;
const productsRouter = require('./products')

const fsPromise = fs.promises


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.engine("hbs", handlebars.engine({
    extname: 'hbs',
    layoutsDir: __dirname + "/views",
    defaultLayout: 'index',
    
}))

//HandleBars

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
res.render("form", {
    layout: "form",
    title: "Página principal",
    Precio: "Precio",
    addProd: "Añadir Producto",
});
});

app.get("/productos", (req, res) => {
res.render("productos", {
    layout: "productos",
    title: "Productos",
    compras: constructor.getAll().sort((a, b) => a.id - b.id),
    noProd: "No hay productos",
});
});

///////////////////////////////////////////////////////////////////

// PUG VIEWS/////

// app.set("views", __dirname + "/views");
// app.set("view engine", "pug");
// app.get("/", (req, res) => {
//   res.render("form", {
//     layout: "form",
//     title: "Página principal",
//     Precio: "Precio",
//     addProd: "Añadir Producto",
//   });
// });

// app.get("/productos", (req, res) => {
//   res.render("productos", {
//     layout: "productos",
//     title: "Productos",
//     compras: constructor.getAll().sort((a, b) => a.id - b.id),
//     noProd: "No hay productos",
//   });
// });

/////////////////////////////////////////////

// EJS VIEWS

// app.set("views", __dirname + "/views");
// app.set("view engine", "ejs");
// app.get("/", (req, res) => {
//   res.render("form", {
//     layout: "form",
//     title: "Página principal",
//     Precio: "Precio",
//     addProd: "Añadir Producto",
//   });
// });

// app.get("/productos", (req, res) => {
//   res.render("productos", {
//     layout: "productos",
//     title: "Productos",
//     compras: constructor.getAll().sort((a, b) => a.id - b.id),
//     noProd: "No hay productos",
//   });
// });


app.use('/productos/', productsRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


