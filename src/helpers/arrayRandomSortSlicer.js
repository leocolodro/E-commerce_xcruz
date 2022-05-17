//Author: Bautista.

//El modulo devuelve el 4 elementos del array pasado 
//por parametros, y con las posiciones cambiadas 
//aleatoriamente. 
function ArrayRandomSortSlicer(array, maxRange) {
    
            //Sortear de manera aleatoria los elementos del array
            array.sort(() => Math.random() > 0.5 ? 1 : -1);
                
            if(array.length <= maxRange){
                return array;
            }
            else{
                //Reducir tamaño de array al mismo valor que maxRanger.
                return array = array.slice(0, maxRange);
            }

}

module.exports = ArrayRandomSortSlicer;