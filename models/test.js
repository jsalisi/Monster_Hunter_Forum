var database = require('./amazon-db-test.js');


// it('data contains correct properties in threads in Amazon RDS database', () => {
//     return database.loadThreads().then((threads) => {
//         for (var key in threads) {
//             expect(threads[`${key}`]).toHaveProperty('title');
//             expect(threads[`${key}`]).toHaveProperty('views');
//             expect(threads[`${key}`]).toHaveProperty('replies');
//             expect(threads[`${key}`]).toHaveProperty('started_by');
//             expect(threads[`${key}`]).toHaveProperty('post_date');
//             expect(threads[`${key}`]).toHaveProperty('last_poster');
//             expect(threads[`${key}`]).toHaveProperty('last_post_date');
//             expect(threads[`${key}`]).toHaveProperty('topic_link');
//         }
//     });
// });

// it('data contains correct property types in threads in Amazon RDS database', () => {
//     return database.loadThreads().then((threads) => {
//         for (var i = 0; i < threads.length; i++) {
//             expect(typeof threads[i].title).toBe(string);
//             expect(typeof threads[i].views).toBe(number);
//             expect(typeof threads[i].replies).toBe(number);
//             expect(typeof threads[i].started_by).toBe(string);
//             expect(typeof threads[i].post_date).toBe(string);
//             expect(typeof threads[i].last_poster).toBe(string);
//             expect(typeof threads[i].last_post_date).toBe(string);
//             expect(typeof threads[i].topic_link).toBe(string);
//         }
//     });
// });

// it('data contains correct post data properties in Amazon RDS database', async () => {
//     return database.loadPosts(14).then((data) => {
//         for (var i=0; i < data.length; i++) {
//             expect(data[i]).toHaveProperty("thread_id_fk")
//             expect(data[i]).toHaveProperty("post_id")
//             expect(data[i]).toHaveProperty("username")
//             expect(data[i]).toHaveProperty("post_date")
//             expect(data[i]).toHaveProperty("post")
//         }
//     });
// })

// describe('Get the next Post ID', () => {
//     test('Post ID is correct type', () => {
//         database.getNextPostID(14).then((numbr) => {
//             expect(typeof numbr).toBe("number");
//             process.exit();
//         });
//     });
// });

// describe('Thread posting test', () => {
//     test('Input empty is false', () => {
//         database.createThread('').then((result) => {
//             expect(result).toBeFalsy();
//         });
//     });
//     test('Input space only is false', () => {
//         database.createThread(' ').then((result) => {
//             expect(result).toBeFalsy();
//         });
//     });
//     test('Input is valid', () => {
//         database.createThread('Heya heya').then((result) => {
//             expect(result).toBeTruthy();
//         });
//     });
// });

describe('testing login functionality', () => {
    test('Input is valid', () => {
        database.testLogin('stephen', 'abc123').then((result) => {
            expect(result).toBeTruthy
        });
    });
    // test('Input is valid', () => {
    //     database.createThread('stephe', 'abc234').then((result) => {
    //         expect(result.length).toBeFalsy
    //     });
    // });
});

// describe('Login Input Test', () => {
//     test('User info is valid', () => {
//         database.loadUsers('anesbyc', 'O4rkWZCHGk').then((result) => {
//             for (var i=0;i < result.length; i++) {
//                 expect(threads[i].username).toBe('username');
//                 expect(threads[i].password).toBe('password');
//             }
//         });
//     });
// });