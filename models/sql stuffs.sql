/* Load all threads and posts */
SELECT * FROM monster_hunter_forum_DB.Threads;
SELECT * FROM monster_hunter_forum_DB.Posts;

/* Load specific threads and their posts */
SELECT post_id FROM monster_hunter_forum_DB.Posts WHERE thread_id_fk = 1

/* Create new thread */
INSERT INTO Threads (thread_id, thread_title, views, link)
    VALUES (10, 'Wut wut', 0, '/Wut_wut');

/* Add post to thread */
INSERT INTO Posts (post_id, username, post_date, post, thread_id_fk) VALUES(1, 'bmalamb', NOW(), 'okay', 10);

/* Register new user */

/* Login check */