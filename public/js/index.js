var quick_tab = document.getElementById('quick_tab')
var mon_logo = document.getElementById('logo')

quick_tab.addEventListener("mouseover", function () {
        quick_tab.style.left='-25px';
});

quick_tab.addEventListener("mouseout", function () {
    quick_tab.style.left = '-175px';
});

mon_logo.addEventListener("mouseover", function () {
    mon_logo.style.opacity = '0.6';
});

mon_logo.addEventListener("mouseout", function () {
    mon_logo.style.opacity = '1';
});