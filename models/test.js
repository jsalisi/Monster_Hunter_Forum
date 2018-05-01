var database = require('./amazon_db.js');

describe('Thread data in Amazon RDS database', () => {
    test('data contains correct properties in threads', () => {
        
        database.loadThreads().then((threads) => {
            for (var i = 0; i < threads.length; i++) {
                expect(threads[i]).toHaveProperty('title');
                expect(threads[i]).toHaveProperty('views');
                expect(threads[i]).toHaveProperty('replies');
                expect(threads[i]).toHaveProperty('started_by');
                expect(threads[i]).toHaveProperty('post_date');
                expect(threads[i]).toHaveProperty('last_poster');
                expect(threads[i]).toHaveProperty('last_post_date');
                expect(threads[i]).toHaveProperty('topic_link');
            };
            process.exit();
        });
    });
});

describe('Post data in Amazon RDS database', () => {
    test('data contains correct properties in posts', () => {
        database.loadPosts().then((threads) => {
            for (var i = 0; i < threads.length; i++) {
                expect(threads[i]).toHaveProperty('thread_id_fk');
                expect(threads[i]).toHaveProperty('post_id');
                expect(threads[i]).toHaveProperty('username');
                expect(threads[i]).toHaveProperty('post_date');
                expect(threads[i]).toHaveProperty('post');
            };
            process.exit();
        });
    });
})