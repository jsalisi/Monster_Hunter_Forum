const users = require('./users.js')

var names = ['stephen','justin','jasper','alex','raziq']
var user_db = [];
for (var i = 0; i<names.length; i++) {
    user_db.push(new users.User(names[i]))
}

var index;

for (var i=0; i<user_db.length; i++) {
    if (user_db[i].username == 'stephen') {
        index = i;
    }
}

user_db[index].post = 'this should be interesting.'

console.log(user_db)