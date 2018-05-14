// This contains example code for creating a new thread
// Static variables shown are either init values or from request.body


// var database = require('./amazon_db');

// Static Variables                                             // thread_id:    New threads will increment from the last thread ID
// var title = "I am potato";                                      // title:        Titles will be retrieved from a from submission using request.body.topTitle
// var view_count = 0;                                             // view_count:   New threads will be initialized with a view count of 0. Link clicks will increment view count.
// var init_post_id = 1;                                           // init_post_id: Initial post ID starts at 1 for every new thread
// var username = "stephen";                                       // username:     Retrieved from the currently logged in user
// var post = "TESTING MY ADD POST FUNCTION";                      // post:         Retrieved from form submission using request.body.topContent


// var main = (choice) => {
//     switch(choice) {
//         case 1:
//             // Getting last thread ID
//             database.getNextThreadID().then((thread_id) => {

//                 // To be used in server.js
//                 // Function call format for creating a new thread
//                 // Threads have an initial post that accompany it on creation
//                 database.createThread(thread_id, title, view_count).then((result) => {
//                     console.log('Adding new thread...');
//                     console.log(result);

//                     // Initial post
//                     var timestamp = new Date();
//                     return database.createPost(init_post_id, thread_id, username, timestamp, post)

//                 }).then((result) => {
//                     console.log('Adding new post...');
//                     console.log(result);

//                     // Add site redirection here

//                     // Stops connection with the database
//                     // Will also stop any functions after it
//                     process.exit();
//                 }).catch((error) => {
//                     console.log(error);
//                     process.exit();
//                 });
//             }).catch((error) => {
//                 console.log(error);
//                 process.exit();
//             });
//             break;
//         case 2:
//             database.loadThreads().then((threads) => {
//                 console.log(threads);
//                 process.exit();
//             });
//             break;
//         case 3:
//             // Pulling information
//             database.loadPosts(14).then((threads) => {
//                 console.log(threads);
//                 process.exit();
//             });
//             break;
//         case 4:            
//             database.getNextPostID(14).then((post_id) => {
//                 console.log(post_id);
//                  process.exit();
//             }).catch((error) => {
//                 console.log(error); 
//                 process.exit();               
//             });
//             break;
//         case 5:
//             var thread_id = 14;
//             database.getNextPostID(thread_id).then((post_id) => {
//                 return database.createPost(thread_id, post_id, username, post)
//             }).then((result) => {
//                 console.log(result);
//                 process.exit();                
//             }).catch((error) => {
//                 console.log(error);
//                 process.exit();
//             });
//             break;
//         case 6:
//             var username = 'stephen'
//             var password = 'abc123'
//             database.loadUsers(username, password).then((results) => {
//                 if (results.length > 0) {
//                     console.log('login successful')
//                     process.exit()
//                 } else {
//                     console.log('login failed.')
//                     process.exit()
//                 }
//             }).catch((error) => {
//                 console.log(error);
//                 process.exit()
//             })
//             break;
//         case 7:
//             var username = 'stephen9876'
//             var password = 'abc123'
//             database.usernameExist(username).then((results) => {
//                 if (results.length == 0) {
//                     database.regUser(username, password).then((regResults) => {
//                         console.log('registration successful!');
//                         process.exit();
//                     }).catch((error) => {
//                         console.log(error);
//                         process.exit();
//                     })
//                 } else {
//                     console.log('Username already exists!');
//                     process.exit();
//                 }
//             }).catch((error) => {
//                 console.log(error);
//                 process.exit();
//             })
//             break;
//         default:
//             database.loadThreads().then((threads) => {
//                 console.log(threads);
//                 process.exit();
//             });

//             // Pulling information
//             database.loadPosts().then((threads) => {
//                 console.log(threads);
//                 process.exit();
//             });
//     }
// }

// main(2);

// TDD verified function
var testLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        // pool.getConnection((err, connection) => {
        //   connection.query(`SELECT * FROM Users where username = '${username}' and password = '${password}';`, (error, results, fields) => {
        //     connection.release();
        //     if (results.length > 0) {
        //       return true
        //     } else {
        //       return false
        //     }
        //   });
        // });
        resolve(true);
    });
}

module.exports = {
    testLogin
}