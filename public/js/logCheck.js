var currentUser;

currentUser = document.getElementById('currentUser').innerHTML

console.log(currentUser)

var check = localStorage.getItem(currentUser)

document.getElementById('logger').value = check;
document.getElementById('checkForm').submit();
