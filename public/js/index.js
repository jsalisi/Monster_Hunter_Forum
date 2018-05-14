var quick_tab = document.getElementById('quick_tab')
var mon_logo = document.getElementById('logo')
var menu = document.getElementById('forum_home')
var close_but = document.getElementById('close_but')
var tab_but = document.getElementsByClassName('tab_but')
var logout_but = document.getElementById('logout_but')
var loginBut = document.getElementById('loginBut')
var reg_but = document.getElementById('reg_but')



menu.addEventListener("mouseover", function () {
    quick_tab.style.top = '17vh';
});

menu.addEventListener("mouseout", function () {
    quick_tab.style.top = '-17vh';
});

quick_tab.addEventListener("mouseover", function () {
    quick_tab.style.top = '17vh';
});

quick_tab.addEventListener("mouseout", function () {
    quick_tab.style.top = '-17vh';
});

close_but.addEventListener("click", function () {
    quick_tab.style.top = '-17vh';
});

mon_logo.addEventListener("mouseover", function () {
    mon_logo.style.opacity = '0.6';
});

mon_logo.addEventListener("mouseout", function () {
    mon_logo.style.opacity = '1';
});

document.getElementById('but_1').addEventListener("mouseover", function () {
    document.getElementById('but_1').style.backgroundColor = 'slategrey';
});

document.getElementById('but_1').addEventListener("mouseout", function () {
    document.getElementById('but_1').style.backgroundColor = 'darkslategrey';
});

document.getElementById('but_2').addEventListener("mouseover", function () {
    document.getElementById('but_2').style.backgroundColor = 'slategrey';
});

document.getElementById('but_2').addEventListener("mouseout", function () {
    document.getElementById('but_2').style.backgroundColor = 'darkslategrey';
});

document.getElementById('but_3').addEventListener("mouseover", function () {
    document.getElementById('but_3').style.backgroundColor = 'slategrey';
});

document.getElementById('but_3').addEventListener("mouseout", function () {
    document.getElementById('but_3').style.backgroundColor = 'darkslategrey';
});

document.getElementById('but_4').addEventListener("mouseover", function () {
    document.getElementById('but_4').style.backgroundColor = 'slategrey';
});

document.getElementById('but_4').addEventListener("mouseout", function () {
    document.getElementById('but_4').style.backgroundColor = 'darkslategrey';
});

document.getElementById('but_5').addEventListener("mouseover", function () {
    document.getElementById('but_5').style.backgroundColor = 'slategrey';
});

document.getElementById('but_5').addEventListener("mouseout", function () {
    document.getElementById('but_5').style.backgroundColor = 'darkslategrey';
});

document.getElementById('close_but').addEventListener("mouseover", function () {
    document.getElementById('close_but').style.backgroundColor = 'slategrey';
});

document.getElementById('close_but').addEventListener("mouseout", function () {
    document.getElementById('close_but').style.backgroundColor = 'darkslategrey';
});

reg_but.addEventListener("mouseover", function () {
    document.getElementById('reg_but').style.backgroundColor = 'slategrey';
});

reg_but.addEventListener("mouseout", function () {
    document.getElementById('reg_but').style.backgroundColor = 'darkslategrey';
});