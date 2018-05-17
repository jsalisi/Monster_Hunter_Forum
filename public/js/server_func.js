const hbs = require('hbs');


var user_index = (username) => {
    var user_index = null;
    for (var i=0; i<users_list.length; i++) {
      if (users_list[i].username == username) {
        user_index = i;
      }
    }
    return user_index
  }
  
var get_banner = (status) => {
    hbs.registerHelper('getBanner', () => {
      if (status == 0) {
        return 'topBanner';
      } else {  
        return 'logBanner';
      }
    });
  }
  
var get_user = (username) => {
  hbs.registerHelper('getUser', () => {
    return request.body.userNow
  });
}

var get_user = (username) => {
    hbs.registerHelper('setLoginCheck', () => {
        return 1
    });
}
