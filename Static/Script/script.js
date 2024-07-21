const hamburger = document.querySelector(".hamburger");
const NavMenu = document.querySelector(".NavMenu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu(){
    hamburger.classList.toggle("active");
    NavMenu.classList.toggle("active");

}
