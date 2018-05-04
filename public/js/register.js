var user_error = document.getElementById("user_error")
var pass_error = document.getElementById("pass_error")
var conf_error  = document.getElementById("conf_error")

var new_user = document.getElementById("new_user")
var new_pass = document.getElementById("new_pass")
var conf_pass = document.getElementById("confirm_pass")

var confirm_button = document.getElementById("gogo")

var user_check = false;
var pass_check = false;
var conf_check = false;

var user_checkmark = document.getElementById("user_checkmark")
var pass_checkmark = document.getElementById("pass_checkmark")
var conf_checkmark = document.getElementById("conf_checkmark")

var checkNewUser = () => {
    var user_value = new_user.value

    if (user_value.length < 5 && user_value.length >= 1) {
        user_error.innerHTML = 'Username has to have minimum of 5 characters!'
        user_check = false
        user_checkmark.style.backgroundImage="url('/img/cross.png')";
        user_checkmark.style.opacity = "1";

    } else if (user_value.length == 0){
        user_error.innerHTML = ''
        user_check = false
        user_checkmark.style.backgroundImage = "url('/img/cross.png')";
        user_checkmark.style.opacity = "0";
        
    } else if ((/^\w+$/).test(user_value) == false) {
        user_error.innerHTML = 'Username can only be composed of alphabet, underscores, and numbers!'
        user_check = false
        user_checkmark.style.backgroundImage = "url('/img/cross.png')";
        user_checkmark.style.opacity = "1";

    } else {
        user_error.innerHTML = ''
        user_check = true
        user_checkmark.style.backgroundImage = "url('/img/checkmark.png')";
        user_checkmark.style.opacity="1";

    }
    console.log(user_check)
}

var checkPass = () => {
    var pass_value = new_pass.value

    if (pass_value.length<8 && pass_value.length >= 1) {
        pass_error.innerHTML = 'Passwords needs to be at least 8 characters in length!'
        pass_check = false
        pass_checkmark.style.backgroundImage = "url('/img/cross.png')";
        pass_checkmark.style.opacity = "1";

    } else if (pass_value.length == 0) {
        pass_error.innerHTML = ''
        pass_check = false
        pass_checkmark.style.backgroundImage = "url('/img/cross.png')";
        pass_checkmark.style.opacity = "0";
    } 
    
    else {
        pass_error.innerHTML = ''
        pass_check = true
        pass_checkmark.style.opacity="1";
        pass_checkmark.style.backgroundImage = "url('/img/checkmark.png')";

    }
    console.log(pass_check)
}

var checkConf = () => {
    var conf_value = conf_pass.value
    var pass_value = new_pass.value

    if (pass_value != conf_value && conf_value.length > 0) {
        conf_error.innerHTML = 'Confirmation does not match!'
        conf_check = false
        conf_checkmark.style.backgroundImage = "url('/img/cross.png')";
        conf_checkmark.style.opacity= "1";

    } else if (pass_value == 0 || conf_value.length == 0){
        conf_error.innerHTML = ''
        conf_check = false
        conf_checkmark.style.backgroundImage = "url('/img/checkmark.png')";
        conf_checkmark.style.opacity = "0";
    } else {
        conf_error.innerHTML = ''
        conf_check = true
        conf_checkmark.style.backgroundImage = "url('/img/checkmark.png')";
        conf_checkmark.style.opacity = "1";
    }
    
}

var activateButton = () => {

    if ((user_check == true) && (pass_check == true) && (conf_check == true)) {
        confirm_button['type'] = 'submit'
    } else {
        alert('Please Finish All Fields Correctly Before Clicking Submit!')
    }
}

new_user.addEventListener("keyup", () => {
    checkNewUser()
    if (event.keyCode == 13) {
        confirm_button.click();
    }
})
new_pass.addEventListener("keyup", () => {
    checkPass()
    if (event.keyCode == 13) {
        confirm_button.click();
    }
})
conf_pass.addEventListener("keyup", () => {
    checkConf()
    if (event.keyCode == 13) {
        confirm_button.click();
    }
})
confirm_button.addEventListener('click', activateButton)