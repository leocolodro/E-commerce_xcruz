const bars = document.getElementById('bars-icon');
const mobileNavBar = document.querySelector('.mobile-navbar-container');


bars.addEventListener("click", () =>{
        mobileNavBar.classList.toggle("active");
});
