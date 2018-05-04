var currentUser;
try{
    currentUser = document.getElementById('currentUser')
} catch (error) {}
finally {
    currentUser = ''
}

console.log(currentUser)
var check = localStorage.getItem(currentUser)
console.log(check)