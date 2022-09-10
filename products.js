const express = require('express')
const {Router} = express;
const fs = require('fs');
const Contenedor = require("./container");
const constructor = new Contenedor("./productos.txt")

const router = Router();

const Products = [];
//  devuelve todos los productos.
router.get('/products', async (req, res) => {
  try {
    res.send(await constructor.getAll());
  } catch (err) {
    res.status(404).send(err);
  }
});

  
//  -> devuelve un producto según su id. 
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.send(await constructor.getById(parseInt(id)));
  } catch (err) {
    res.status(404).send(err);
  }
});

// agrega productos 
router.post('/products', async (req, res)=>{
  try {
    const {title, price, tumbnail} = req.body;
    const id = Products.length+1
    const itemToSave = {
      id,
      title,
      price,
      tumbnail
    }
    res.send(await constructor.save(itemToSave));
  } catch (err) {
    res.status(404).send(err);
  }
})


// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id. 
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {title, price, tumbnail} = req.body;
    const idInt = parseInt(id);
    const itemToUpdate = {
      id: idInt,
      title,
      price,
      tumbnail
    }
    res.send(await constructor.updateById(idInt, itemToUpdate));
  } catch (err) {
    res.status(404).send(err.msg);
  }
});


// DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete('/products/:id', async (req,res)=>{
  try {
    const { id } = req.params;
    res.send(await constructor.deleteById(parseInt(id)));
  } catch (err) {
    res.status(404).send(err.msg);
  }
});

module.exports = router;

