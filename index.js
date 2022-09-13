const express = require('express');
const fs = require ('fs')
const handlebars = require('express-handlebars')
const app = express()
const port = 8080;
const productsRouter = require('./products')



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

app.get("/productos", async(req,res)=>{
    const { id } = req.query;
  try {
    const data = await constructor.getById(parseInt(id));

    return res.send(data);
  } catch (e) {
    return res.status(404).send({ error: true, msg: e.message });
  }
})


app.use('/productos/', productsRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


