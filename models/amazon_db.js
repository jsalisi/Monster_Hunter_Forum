var mysql = require('mysql');

// secret.json file is required for Amazon RDS to work
var config = require('./json/secret.json');

// Creates the connection to the database
var pool  = mysql.createPool({
  host: config.dbhost,
  user: config.dbuser,
  password: config.dbpassword,
  database: config.dbname,
  port: config.port
});

/**
 * Loads all threads from the database
 */
var loadThreads = (cat_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // Use the connection
      connection.query(`SELECT *, DATE_FORMAT(b.post_date, "%W %M %e, %Y %H:%i") as post_date FROM monster_hunter_forum_DB.Threads as a JOIN monster_hunter_forum_DB.Posts as b ON a.thread_id=b.thread_id_fk WHERE category_id = ${cat_id};`, (error, results, fields) => {
        // process the result so its easier to pass to hbs
        var tempdb = {};

        for (var x in results) {
          if (results[x].thread_id in tempdb) {
            // if in tempdb, update last_poster, last_post_date, and replies
            tempdb[`${results[x].thread_id}`]['last_poster'] = results[x].username;
            tempdb[`${results[x].thread_id}`]['last_post_date'] = results[x].post_date;
            tempdb[`${results[x].thread_id}`]['replies'] += 1;
          } else {
            // if thread title not in tempdb, create entry with format "title": {id: int, etc}
            tempdb[`${results[x].thread_id}`] = { title: results[x].thread_title, views: results[x].views, replies: 0, started_by: results[x].username, post_date: results[x].post_date, last_poster: results[x].username, last_post_date: results[x].post_date, topic_link: results[x].thread_id + '=' + results[x].thread_title.replace(/ /g, "_") };
          }
        }
        // And done with the connection.
        connection.release();
        // Handle error after the release.
        if (error) reject(error);
        else resolve(tempdb);
      });
    });
  });
}

/**
 * Loads all posts from the database
 * Query can be adjusted to select posts for a specific thread
 */
var loadPosts = (thread_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // Use the connection
      connection.query(`SELECT *, DATE_FORMAT(b.post_date, "%a %b %e, %Y %H:%i:%s") as post_date FROM monster_hunter_forum_DB.Threads as a JOIN monster_hunter_forum_DB.Posts as b ON a.thread_id=b.thread_id_fk AND b.thread_id_fk=${thread_id};`, (error, results, fields) => {
        // And done with the connection.
        connection.release();
        // Handle error after the release.
        if (error) reject(error);
        else resolve(results);
      });
    });
  });
}

/**
 * Creates a new thread and appends to the database
 * @param {number} thread_id - A unique thread ID
 * @param {string} thread_title - The title for the thread
 * @param {number} views - Number of times a thread has been clicked
 */
var createThread = (thread_title, cat_id) => {
  return new Promise((resolve, reject) => {
    if (thread_title != '' && thread_title != ' ') {
      pool.getConnection((err, connection) => {
        // Use the connection
        connection.query(`INSERT INTO Threads (thread_title, views, category_id)
        VALUES('${thread_title}', 0, ${cat_id});`, (error, results, fields) => {
          // And done with the connection.
          connection.release();
          // Handle error after the release.
          if (error) reject(error);
          else resolve(true);
        });
      });
    } else {
      resolve(false);
    };
  });
}

/**
 * Creates a post and appends to the database
 * @param {number} post_id - A post ID unique for each thread
 * @param {number} thread_id - A unique ID for each thread
 * @param {string} username - A unique username for each user
 * @param {string} datetime - The posts' date and time
 * @param {string} post - The contents of the post
 */
var createPost = (thread_id, post_id, username, post) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // Use the connection
      connection.query(`INSERT INTO Posts (thread_id_fk, post_id, username, post_date, post) 
      VALUES(${thread_id}, ${post_id}, '${username}', NOW(), '${post}');`, (error, results, fields) => {
        // And done with the connection.
        connection.release();
        // Handle error after the release.
        if (error) reject(error);
        else resolve(results);
      });
    });
  });
}

/**
 * Increments the most recent thread number for use
 * in the next new thread.
 */
var getNextThreadID = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // Use the connection
      connection.query(`SELECT thread_id FROM monster_hunter_forum_DB.Threads ORDER BY thread_id DESC LIMIT 1;`, (error, results, fields) => {
        // And done with the connection.
        connection.release();
        // Handle error after the release.
        if (error) reject(error);
        else resolve(results[0].thread_id);
      });
    });
  });
}

/**
 * Thread ID to be used to determine which thread will be posted in
 * @param {number} thread_id - The unique thread number
 */
var getNextPostID = (thread_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // Use the connection
      connection.query(`SELECT post_id FROM monster_hunter_forum_DB.Posts WHERE thread_id_fk = ${thread_id} ORDER BY post_id DESC LIMIT 1;`, (error, results, fields) => {
        // And done with the connection.
        connection.release();
        // Handle error after the release.
        if (error) reject(error);
        else resolve(results[0].post_id + 1);
      });
    });
  });
}

/**
 * @function - used to login to the forum
 * @param {string} username - username param from post form
 * @param {string} password - password param from post form
 */
var loadUsers = (username, password) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // Use the connection
      connection.query(`SELECT * FROM Users where username = '${username}' and password = '${password}';`, (error, results, fields) => {
        // And done with the connection.
        connection.release();
        // Handle error after the release.
        if (error) reject(error);
        else resolve(results);
      });
    });
  });
}

/**
 * @function - used to check if username exists for regirstration. username must be unique.
 * @param {string} username - username param to check if it exist for registration
 */
var usernameExist = (username) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // Use the connection
      connection.query(`SELECT * FROM Users where username = '${username}';`, (error, results, fields) => {
        // And done with the connection.
        connection.release();
        // Handle error after the release.
        if (error) reject(error);
        else resolve(results);
      });
    });
  });
}

/**
 * @function - used to add this user to db
 * @param {string} username - param set for regirstration after exist check passes
 * @param {string} password - param set for regirstration password
 */
var regUser = (username, password) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // Use the connection
      connection.query(`INSERT INTO Users (username, password)
      VALUES ('${username}', '${password}');`, (error, results, fields) => {
        // And done with the connection.
        connection.release();
        // Handle error after the release.
        if (error) reject(error);
        else resolve(results);
      });
    });
  });
}

/**
 * Obtains the thread ID of the currently clicked post
 * @param {number} thread_id the thread id of the thread being posted to
 */
var updateView = (thread_id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      connection.query(`UPDATE monster_hunter_forum_DB.Threads SET views = views + 1 WHERE thread_id=${Number(thread_id)};`)
      connection.release();
    });
  });
}


module.exports = {
  loadThreads,
  loadPosts,
  createThread,
  createPost,
  getNextThreadID,
  getNextPostID,
  loadUsers,
  usernameExist,
  regUser,
  updateView,
}
