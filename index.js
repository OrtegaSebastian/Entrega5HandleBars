const express = require('express');

const app = express()
const port = 8080;
const productsRouter = require('./products')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))


app.get('/', (req,res)=>{
    res.send("Main page")
})

app.use('/api/', productsRouter);





app.listen(port, () => console.log(`Example app listening on port ${port}!`))


