function JsonArrayAnalyzer(filePath) {
    //File System Module.
    const fs = require('fs');

    //Productos DataBase
    let arrray = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if(file.length === 0){
        return [
            {
                id: 1,
                titulo: "Example",
                colores: ["Marron","Negro"],
                categoria: "Botas",
                porcentajeDescuento: 0,
                precio: 0,
                talles: [40,42,43],
                descripcion: "Este producto está a modo de ejemplo.\nEliminar una vez que haya agregado productos",
                imagenesUrl: ["../images/zapatos/producto_1/zapato_cuero_marron_1.jpg","../images/zapatos/producto_1/zapato_cuero_marron_2.jpg","../images/zapatos/producto_1/zapato_cuero_marron_3.jpg"]
            }
        ];
    }
    else{
        return file;
    }
}

module.exports = JsonArrayAnalyzer;