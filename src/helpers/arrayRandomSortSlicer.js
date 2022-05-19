//Author: Bautista.

//The module returns an array randomly sorted and 
//reduces it size to the same value of maxRange (params: 2)
function ArrayRandomSortSlicer(array, maxRange) {
    
            //Sorts randomly elements from array
            array.sort(() => Math.random() > 0.5 ? 1 : -1);
                
            if(array.length <= maxRange){
                return array;
            }
            else{
                //Reduces size to the same value of maxRange
                return array = array.slice(0, maxRange);
            }

}

module.exports = ArrayRandomSortSlicer;