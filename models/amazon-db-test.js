// This contains example code for creating a new thread
// Static variables shown are either init values or from request.body


var database = require('./amazon_db');

// Static Variables
var thread_id = 9;                                              // thread_id:    New threads will increment from the last thread ID
var title = "How does this work?";                              // title:        Titles will be retrieved from a from submission using request.body.topTitle
var view_count = 0;                                             // view_count:   New threads will be initialized with a view count of 0. Link clicks will increment view count.
var link = "/" + title.replace(/ /g, "_").substring(0, 14);     // link:         Spaces in the title are replaced with underscores; limited to 15 chars
var init_post_id = 1;                                           // init_post_id: Initial post ID starts at 1 for every new thread
var username = "bmalamb";                                       // username:     Retrieved from the currently logged in user
var post = "Testing my js function";                            // post:         Retrieved from form submission using request.body.topContent

// To be used in server.js
// Function call format for creating a new thread
// Threads have an initial post that accompany it on creation
database.createThread(thread_id, title, view_count, link).then((result) => {
    console.log('Adding new thread...');
    console.log(result);

    // Initial post
    var timestamp = new Date();
    return database.createPost(init_post_id, result.thread_id, username, timestamp, post)

}).then((result) => {
    console.log('Adding new post...');
    console.log(result);
    
    // Add site redirection here

    // Stops connection with the database
    // Will also stop any functions after it
    process.exit();
}).catch((error) => {
    console.log(error);
    process.exit();
});