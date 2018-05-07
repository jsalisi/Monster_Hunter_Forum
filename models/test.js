var database = require('./amazon_db.js');
var toBeType = require("jest-tobetype");


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

    test('data contains correct properties in threads', () => {

        database.loadThreads().then((threads) => {
            for (var i = 0; i < threads.length; i++) {
                expect(threads[i].title).toBeType("string");
                expect(threads[i].views).toBeType("number");
                expect(threads[i].replies).toBeType("number");
                expect(threads[i].started_by).toBeType("string");
                expect(threads[i].post_date).toBeType("string");
                expect(threads[i].last_poster).toBeType("string");
                expect(threads[i].last_post_date).toBeType("string");
                expect(threads[i].topic_link).toBeType("string");
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
    test('data contains correct properties in threads', () => {

        database.loadThreads().then((threads) => {
            for (var i = 0; i < threads.length; i++) {
                expect(threads[i].thread_id_fk).toBeType("number");
                expect(threads[i].post_id).toBeType("number");
                expect(threads[i].username).toBeType("string");
                expect(threads[i].post_date).toBeType("string");
                expect(threads[i].post).toBeType("string");
            };
            process.exit();
        });
    });
})

describe('Get the next Post ID', () => {
    test('Post ID is correct type', () => {
        database.getNextPostID(14).then((numbr) => {
            expect(typeof numbr).toBe("number");
            process.exit();
        });
    });
});

describe('Thread posting test', () => {
    test('Input empty is false', () => {
        database.createThread('').then((result) => {
            expect(result).toBeFalsy();
        });
    });
    test('Input space only is false', () => {
        database.createThread(' ').then((result) => {
            expect(result).toBeFalsy();
        });
    });
    test('Input is valid', () => {
        database.createThread('Heya heya').then((result) => {
            expect(result).toBeTruthy();
        });
    });
});