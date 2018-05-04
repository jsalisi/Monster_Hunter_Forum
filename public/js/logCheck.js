// var userArr = []

// for (var key in localStorage) {
//     if (localStorage[key] == 1) {
//         userArr.push(key)
//     }
// }
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