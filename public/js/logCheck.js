var currentUser;

for (var key in localStorage) {
    currentUser = key;
}

var check = localStorage.getItem(currentUser)

document.getElementById('logger').value = check;
document.getElementById('userNow').value = currentUser;
document.getElementById('checkForm').submit();
