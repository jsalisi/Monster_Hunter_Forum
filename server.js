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
// Importing file to access the Google Spreadsheet database
const db = require('./models/amazon_db.js');
const database = require('./public/js/google-sheets-functions.js');
const urlencodedParser = bodyParser.urlencoded({ extended: false});

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
var current_user = '';
var login_flag = 0;
var browser_flag = 0;
var dupe_comment = '';
var current_sheet = '';
var redir_page = '';

hbs.registerHelper('getBanner', () => {
    if (login_flag === 0) {
        return 'topBanner'
    } else {
        return 'logBanner'
    }
});

hbs.registerHelper('setLoginCheck', () => {
    return login_flag;
});

hbs.registerHelper('getUser', () => {
    return current_user;
});

hbs.registerHelper('getDupe', () => {
    return dupe_comment;
});

hbs.registerHelper('setBrowserFlag', () => {
    return browser_flag;
});


//*********************************Rendering*******************************//

passport.deserializeUser(function(id, done) {
    done(err, user);
});


// Redirecting '/' to Home Page
app.get('/', (request, response) => {
  response.redirect('/home');
});

// rendering home page.
// refer to google-sheets-functions.js for .loadPosts()
app.get('/home', (request, response) => {
  db.loadThreads().then((post) => {
    console.log('Loading posts...');
    response.render('index.hbs', {
        thread: post
    });
  }).catch((error) => {
    response.send(error);
  });
});

// login cred check
app.get('/relog', (request, response) => {
  response.render('relogin.hbs')
});

app.post('/checkCred', urlencodedParser, (request, response) => {
    db.loadUsers(request.body.user, request.body.pass).then((results) => {
      if (results.length > 0) {
          current_user = request.body.user
          login_flag = 1
          //if (request.body.remember === 'True'){
          //}
          response.redirect('/home')
      } else {
          response.redirect('/relog')
      }

    }).catch((error) => {
      console.log(error);
    });
});

// logout
app.post('/logOut', urlencodedParser, (request, response) => {
    current_user = ''
    login_flag = 0
    response.redirect('/home')
});

// rendering post topic list page
app.get('/postThread', (request, response) => {
    response.render('postThread.hbs', {})
});

// posting thread to gs
app.post('/postResult', urlencodedParser, (request, response) => {
    // The redirect link for the new thread
    //var link_title = request.body.topTitle.replace(/ /g, "_").substring(0, 14);

    // Getting last thread ID
    db.getNextThreadID().then((thread_id) => {

      // Function call format for creating a new thread
      // Threads have an initial post that accompany it on creation
      db.createThread(thread_id, request.body.topTitle, 0).then((result) => {
        console.log('Adding new thread...');
        console.log(result);

        // Initial post
        var timestamp = new Date();
        return db.createPost(1, thread_id, current_user, timestamp, request.body.topContent)

      }).then((result) => {
        console.log('Adding new post...');
        console.log(result);

        // Will be changed when load threads/posts is functional
        response.redirect(`/home`);

        // Stops connection with the database
        // Will also stop any functions after it
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
});

// TODO: Post to thread
app.get('/newPost', (request, response) => {
    response.render('createPost.hbs', {})
});

app.post('/newPostResult', urlencodedParser, (request, response) => {
  var datetime = new Date();
  database.addNewPost(current_user, datetime, request.body.topContent, current_sheet).then((result) => {
    console.log(result);
    response.redirect(redir_page);
  }).catch((error) => {
    response.send(error);
  });
})

app.get('/register', (request, response) => {
    response.render('register.hbs', {})
});

app.post('/postReg', urlencodedParser, (request, response) => {
  db.usernameExist(request.body.new_user).then((results) => {
    if (results.length == 0) {
      if (request.body.new_pass == request.body.confirm_pass){
        db.regUser(request.body.new_user, request.body.new_pass).then((regResults) => {
            console.log('registration successful!');
            browser_flag = 1
            response.redirect('/home');
            setTimeout (() => {
                browser_flag = 0
            }, 1000);
        }).catch((error) => {
            console.log(error);
        })
      } else {
        dupe_comment = "Confirmation of password does not match!!"
            response.render('register.hbs', {})
            console.log("no accounts registered")
      }
    } else {
      dupe_comment = "Cannot Register Account! Username already taken!!"
      response.render('register.hbs', {})
      console.log("no accounts registered")
    }
  }).catch((error) => {
      console.log(error);
      process.exit();
  })
});

app.param('name', (request, response, next, name) => {
  var topic_title = name.split('=');
  request.name = topic_title;
  next();
});


//NOTE: post_sheet has other data on it that can be used to show posts.
//      only username and post is used so far.
//      refer to loadPosts() in google-sheets-functions.js
app.get('/:name', (request, response) => {
  db.loadPosts(Number(request.name[0])).then((post_list) => {
    response.render('discussion_thread.hbs', {
      topic: request.name[1],
      posts: post_list});
    // TODO: create function to update view count
    // redir_page = response.req.url;
    // database.updatePostView(current_sheet);
  }).catch((error) => {
    response.send(error);
  });
});

//****************************Server***************************************//
app.listen(port, () => {
  console.log('Server is up on the port 8080');
});
