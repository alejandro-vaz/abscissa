document.getElementById("menu-search").addEventListener("click", function() {
    redirect("search")
})

function redirect(target) {
    window.location.href = `./${target}.html`
}