//Este modulo es a modo demostrativo.
//Los datos dentro de este deberan ser colocados en una base de datos.
//Author: Bautista.

//Path Module.
const path = require('path');

const productos = [
    {
        id: "1",
        titulo: "Siena",
        colores: ["Marrón"],
        categoria: "Botas",
        porcentajeDescuento: "0",
        precio: "10500",
        talles: [38, 40, 42, 43, 44],
        imagenesUrl: ['../images/zapatos/producto_1/zapato_cuero_marron_1.jpg','../images/zapatos/producto_1/zapato_cuero_marron_2.jpg','../images/zapatos/producto_1/zapato_cuero_marron_3.jpg']
        
    },
    {
        id: "2",
        titulo: "2558",
        colores: ["Negro"],
        categoria: "De vestir",
        porcentajeDescuento: "0",
        precio: "12990",
        talles: [39, 41, 42],
        imagenesUrl: ['../images/zapatos/producto_2/zapato_cuero_punta_negro_1.jpg', '../images/zapatos/producto_2/zapato_cuero_punta_negro_2.jpg', '../images/zapatos/producto_2/zapato_cuero_punta_negro_3.jpg']
    },
    {
        id: "3",
        titulo: "RE9",
        colores: ["Marrón"],
        porcentajeDescuento: "0",
        precio: "10500",
        talles: [40, 42],
        imagenesUrl: ['../images/zapatos/producto_3/bota_chelsea_cuero_negro_1.jpg','../images/zapatos/producto_3/bota_chelsea_cuero_negro_2.jpg','../images/zapatos/producto_3/bota_chelsea_cuero_negro_3.jpg', '../images/zapatos/producto_3/bota_chelsea_cuero_negro_4.jpg']
    }
];

module.exports = productos;