/**
 * @type {object} express - requires express module
 * @type {object} request - requires request module
 * @type {object} bodyParser - requires bodyParser module
 * @type {object} hbs - requires hbs module
 * @type {object} session - requires session module
 * @type {object} passport - requires passport module
 * @type {object} cookieParser - requires cookieParser module
 * @type {object} port - sets listening port to 8080
 */
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8080;

/**
 * @type {object} database - requires from google-sheets-functions.js to setup database
 * @type {object} urlencodedParser - calls on bodyParser.urlencoded{{extended:false}} for form posting
 */
// Importing file to access the Amazon database
const db = require('./models/amazon_db.js');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const user_db = require('./models/classes/users.js');

// ** DEPRECATED **
// const database = require('./public/js/google-sheets-functions.js');


/**
 * @type {type} app - sets app to call on express() initialization
 */
var app = express();

/**
 * @param {object} express.static - set up app.use so that it uses html related files from that directory
 * @param {string} __dirname - folder path
 */
app.use(express.static(__dirname + '/public'));
/*app.use(passport.initialize());
app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialzed: true
}));
app.use(passport.session());*/

/**
 * @param {string} views sets - views from the views directory
 * @type {string} view engine - set sets view engine from the module hbs
 */
app.set('views', './views');
app.set('view engine', 'hbs');

/**
 * @param {string} __dirname - registering partials in following paths
 */
hbs.registerPartials(__dirname + '/views/partials/homePartials');
hbs.registerPartials(__dirname + '/views/partials/monhunPartials');
hbs.registerPartials(__dirname + '/views/partials/communityPartials');

/**
 * @param {string} current_user - current user flag
 * @param {number} login_flag - flags for login status will be removed later
 * @param {number} brower_flag - flags for browser status used for partial swaps
 * @param {string} dupe_comment - comment for error if dupe user detected when trying to register a new user
 * @param {string} current_sheet - sets the current google spreadsheet for thread link
 * @param {string} redir_page - sets varable for redirect after login
 */

var users_list = [];


//*********************************static functions***********************************//
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

//*********************************Rendering*******************************//

passport.deserializeUser(function(id, done) {
    done(err, user);
});

app.get('/404', (req, res) => {
  res.render('error_page.hbs');
});

// Redirecting '/' to Home Page
app.get('/', (request, response) => {
  response.redirect('/login');
});

app.get('/login', (request, response) => {
  response.render('sort.hbs', {})
});

app.get('/home', (request, response) => {
  response.redirect('/login');
})

app.get('/homepage', (request, response) => {
  get_banner(0)
  response.render('Homepage.hbs');
})
// rendering home page.
// refer to google-sheets-functions.js for .loadPosts()
app.post('/welcome', urlencodedParser, (request, response) => {
  db.loadThreads().then((post) => {
      if(request.body.loginCheck == 1) {
        hbs.registerHelper('getUser', () => {
          return request.body.userNow
        });
        get_banner(1)
        hbs.registerHelper('setLoginCheck', () => {
          return 1
        });
        response.render('index.hbs', {
          thread: post
        });
        console.log('loggged')
      } else if (request.body.loginCheck == '') {
        get_banner(0)
        response.render('index.hbs', {
          thread: post
        });
        console.log('out')
      } else {
        console.log('neither')
        response.redirect('/login')
      }
  }).catch((error) => {
    response.send(error);
    response.redirect('/404');
  });
});

// login cred check
app.get('/relog', (request, response) => {
  response.render('relogin.hbs');
});

app.post('/checkCred', urlencodedParser, (request, response) => {
    db.loadUsers(request.body.user, request.body.pass).then((results) => {
      var username = request.body.user
      console.log(results)
      if ((results.length > 0) && (user_index(username) == null)) {
          users_list.push(new user_db.User(username))
          
          users_list[user_index(username)].login_flag = 1

          hbs.registerHelper('getUser', () => {
            return username
          });

          hbs.registerHelper('setLoginCheck', () => {
            return users_list[user_index(username)].login_flag
          });
          console.log(users_list)
          response.render('logging.hbs')
      } else if (results.length > 0) {

          hbs.registerHelper('getUser', () => {
            return username
          });

          hbs.registerHelper('setLoginCheck', () => {
            return users_list[user_index(username)].login_flag
          });

          console.log(users_list)
          response.redirect('/login')
      } else {
          response.redirect('/relog')
      }

    }).catch((error) => {
      console.log(error);
      response.redirect('/404');
    });
});

// logout
app.post('/logOut', urlencodedParser, (request, response) => {
    users_list.splice(user_index(request.body.username), 1)
    hbs.registerHelper('setLoginCheck', () => {
      return 0
    });

    hbs.registerHelper('getUser', () => {
      return request.body.username
    });

    response.render('logOut.hbs', {})
});

// rendering post topic list page
app.post('/postThread', urlencodedParser, (request, response) => {
  hbs.registerHelper('getUser', () => {
    return request.body.username
  });
  response.render('postThread.hbs', {})
});

// posting thread to gs
app.post('/postResult', urlencodedParser, (request, response) => {
  var tid;
  var currentUser = request.body.currentUser;
    // The redirect link for the new thread
    //var link_title = request.body.topTitle.replace(/ /g, "_").substring(0, 14);

    // Getting last thread ID
    // db.getNextThreadID().then((thread_id) => {

      // Function call format for creating a new thread
      // Threads have an initial post that accompany it on creation
      db.createThread(request.body.topTitle).then((result) => {
        if (result == true) {
          console.log('Adding new thread...');
          console.log(result);
          return db.getNextThreadID();
        } else if (result == false) {
          throw new Error('Invalid thread title. Did not create thread');
        }
      }).then((thread_id) => {
        console.log(thread_id);
        tid = thread_id;

        // Initial post
        return db.createPost(thread_id, 1, currentUser, request.body.topContent);

      }).then((result) => {
        console.log('Adding new post...');
        console.log(result);

        // Will be changed when load threads/posts is functional
        response.redirect(`/${tid}=${request.body.topTitle.replace(/ /g, "_")}`);

        // Stops connection with the database
        // Will also stop any functions after it
      }).catch((error) => {
        console.log(error);
        response.redirect('/404');
      });
});

/**
 * hbs page for making a quick reply to a thread
 */
app.get('/newPost', (request, response) => {
  response.render('createPost.hbs', { link: response.req.headers.referer.split('/')[3]});
});

/**
 * Retrieves user submitted data for a new post
 * Puts data into the Amazon database
 * Redirects back to parent thread when done
 */
app.post('/newPostResult', urlencodedParser, (request, response) => {
  var link = request.body.link.split('=');
  var currentUser = request.body.currentUser;
  db.getNextPostID(link[0]).then((result) => {
    db.createPost(link[0], result, currentUser, request.body.topContent);
  }).then((result) => {
    response.redirect(`/${request.body.link}`);
  }).catch((error) => {
    console.log(error);
    response.redirect('/404');
  });
});

/**
 * hbs page for registering a new account
 */
app.get('/register', (request, response) => {
    response.render('register.hbs', {})
});

/**
 * Retrieves the user submitted to process a new account
 * Checks username for existing users to prevent duplicates
 */
app.post('/postReg', urlencodedParser, (request, response) => {
  var dupe_comment;
  var brower_flag = 0;
  
  db.usernameExist(request.body.new_user).then((results) => {
    if (results.length == 0) {
      db.regUser(request.body.new_user, request.body.new_pass).then((regResults) => {
          console.log('registration successful!');
          browser_flag = 1
          hbs.registerHelper('setBrowserFlag', () => {
            return browser_flag;
          });
          response.redirect('/home');
          setTimeout (() => {
              browser_flag = 0
          }, 1000);
      }).catch((error) => {
          console.log(error);
      })
    } else {
      dupe_comment = "Cannot Register Account! Username already taken!!"
      hbs.registerHelper('getDupe', () => {
        return dupe_comment;
      });
      response.render('register.hbs', {})
      console.log("no accounts registered")
    }
  }).catch((error) => {
      console.log(error);
      response.redirect('/404');
  })
});


/**
 * Processes the name of the thread to be used as the url extension of
 * the webpage
 */
setTimeout(() => {
  app.param('name', (request, response, next, name) => {
    var topic_title = name.split('=');
    request.name = topic_title;
    db.updateView(topic_title[0]);
    next();
  });
}, 500);

/**
 * Creates a webpage based on the title of the thread
 */
app.get('/:name', (request, response) => {
  db.loadPosts(Number(request.name[0])).then((post_list) => {
    if (post_list.length > 0) {
      response.render('discussion_thread.hbs', {
        topic: request.name[1].replace(/_/g, " "),
        posts: post_list
      });
    } else {
      throw new Error('Failed to get thread posts... maybe you are on welcome page');
    }
  }).catch((error) => {
    console.log(error);
    response.redirect('/404');
  });
});

//****************************Server***************************************//
app.listen(port, () => {
  console.log('Server is up on the port 8080');
});
