//@Author: Daniel

window.addEventListener("load",function(){
    let titulo = document.querySelector("#titulo");
    let color = document.querySelector("#color");
    let descripcion = document.querySelector("#descripcion");
    let precio = document.querySelector("#precio");
    let alertaTitulo = document.querySelector(".alerta-titulo");
    let alertaColor = document.querySelector(".alerta-color");
    let alertaDescripcion = document.querySelector(".alerta-descripcion");
    let alertaPrecio = document.querySelector(".alerta-precio");




    titulo.addEventListener("blur", function(){
        if(titulo.value.length < 5){
            // alert("Este campo debe tener 5 caracteres")
            alertaTitulo.textContent = "Este campo debe tener minimo 5 caracteres";
            alertaTitulo.style.color = "red";
        }else{
            alertaTitulo.textContent = "";
        }
    })

    color.addEventListener("blur", function(){
        if(color.value == ""){
            alertaColor.textContent = "Este campo es obligatorio";
            alertaColor.style.color = "red";
        }else{
            alertaColor.textContent = "";
        }
    })

    descripcion.addEventListener("blur", function(){
        if(descripcion.value.length < 20){
            alertaDescripcion.textContent = "Este campo debe tener minimo 20 caracteres";
            alertaDescripcion.style.color = "red";
        }else{
            alertaDescripcion.textContent = "";
        }
    })

    precio.addEventListener("blur", function(){
        if(precio.value == ""){
            alertaPrecio.textContent = "Este campo es obligatorio"
            alertaPrecio.style.color = "red";
        }else{
            alertaPrecio.textContent = "";
        }
    })

})
