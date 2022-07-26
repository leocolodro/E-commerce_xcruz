const header = document.querySelector('.header');
const hamburger = header.querySelector('.hamburger');
const layers = hamburger.querySelectorAll('span');

hamburger.addEventListener("click", () =>{
    layers.forEach((layer) => {
        layer.classList.toggle("active");
    });
});