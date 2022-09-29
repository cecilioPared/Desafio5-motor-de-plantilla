var express = require('express');
var router = express.Router();

const Producto = require('../models/productos')
const producto = new Producto([]);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Desafio 5 - motor de plantillas' , baseURL: process.env.NODE_URL });
});


router.get("/productos", (req, res) => {
  const productos = producto.obtener()
  console.log(productos)
  const data = {
      productos,
      isEmpty: productos.length,
      baseURL: process.env.NODE_URL
  }
  res.render("productos", data)
})

router.post("/productos", (req, res, next) => {
  
  try {
    let { body: newData } = req;
    console.log(newData)
    producto.crear(newData);
    let listado = producto.obtener()
        const data = {
          productos: listado,
          isEmpty: listado.length,
          baseURL: process.env.NODE_URL
      }
    res.status(201).render("productos", data)    
  } catch (error) {
    next(error);
  }
  
})

module.exports = router;
