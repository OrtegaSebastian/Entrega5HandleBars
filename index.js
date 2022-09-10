const express = require('express');
const fs = require ('fs')
const app = express()
const port = 8080;
const productsRouter = require('./products')
const fsPromise = fs.promises


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static("public"))

app.engine('html', async (filePath, options, callback)=>{
    
    //model
    const {id,tittle,price,thumnail} = options;
    //view
    const template = await fsPromise.readFile(filePath, 'utf-8')

    //controller
    const rendered = template.replace('{{id}}',id,'{{tittle}}',tittle,'{{price}}',price,'{{thumnail}}',thumnail,)  


    return callback(null, rendered); 


})

app.set('views','/views')
app.set('view engine','html')

app.get('/api/:id', (req,res)=>{
    res.send("Main page")
    const productos = {
        id: req.params.id,
        tittle: req.params.tittle,
        price: req.params.price,
        thumnail: req.params.thumnail
    }

    res.render('index', productos)
})

app.use('/api/', productsRouter);





app.listen(port, () => console.log(`Example app listening on port ${port}!`))


