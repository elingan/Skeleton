function toggle_navbar() {
    var nav = document.getElementsByClassName("navbar")[0];
    nav.classList.toggle("in");
    var links = document.getElementsByClassName("navbar-link");
    if (nav.classList.contains('in')) {
        Array.prototype.forEach.call(links, function(link) {
            link.addEventListener("click", toggle_navbar);
        });
    } else {
        Array.prototype.forEach.call(links, function(link) {
            link.removeEventListener("click", toggle_navbar);
        });
    }
}