var database = require('./amazon_db.js');

// describe('Thread tests from Amazon RDS database', async () => {
//     test('thread properties', () => {
//         expect.assertions(8);
//         return database.loadThreads(0).then((threads) => {
//             expect(threads[`19`]).toHaveProperty('title');
//             expect(threads[`19`]).toHaveProperty('views');
//             expect(threads[`19`]).toHaveProperty('replies');
//             expect(threads[`19`]).toHaveProperty('started_by');
//             expect(threads[`19`]).toHaveProperty('post_date');
//             expect(threads[`19`]).toHaveProperty('last_poster');
//             expect(threads[`19`]).toHaveProperty('last_post_date');
//             expect(threads[`19`]).toHaveProperty('topic_link');
//         }).catch((error) => {
//             console.log(error);
//         });
//     });

//     test('thread result types', async () => {
//         expect.assertions(9);
//         return database.loadThreads(0).then((threads) => {
//             expect(typeof threads[`19`]).toBe("object");
//             expect(typeof threads[`19`].title).toBe("string");
//             expect(typeof threads[`19`].views).toBe("number");
//             expect(typeof threads[`19`].replies).toBe("number");
//             expect(typeof threads[`19`].started_by).toBe("string");
//             expect(typeof threads[`19`].post_date).toBe("string");
//             expect(typeof threads[`19`].last_poster).toBe("string");
//             expect(typeof threads[`19`].last_post_date).toBe("string");
//             expect(typeof threads[`19`].topic_link).toBe("string");
//         }).catch((error) => {
//             console.log(error);
//         });
//     });
// });

// describe('Post tests from Amazon RDS database', async () => {
//     test("data contains correct post data properties", () => {
//         expect.assertions(5);
//         return database.loadPosts(14).then((data) => {
//             expect(data[data.length-1]).toHaveProperty("thread_id_fk")
//             expect(data[data.length-1]).toHaveProperty("post_id")
//             expect(data[data.length-1]).toHaveProperty("username")
//             expect(data[data.length-1]).toHaveProperty("post_date")
//             expect(data[data.length-1]).toHaveProperty("post")
//         }).catch((error) => {
//             console.log(error);
//         });
//     });
// });

// describe('Get the next Post ID', async () => {
//     test('Post ID is correct type', () => {
//         expect.assertions(1);
//         return database.getNextPostID(14).then((numbr) => {
//             expect(typeof numbr).toBe("number");
//         }).catch((error) => {
//             console.log(error);
//         });
//     });
// });

describe('Thread posting test', () => {
    test('Input empty is false', () => {
        database.createThread('').then((result) => {
            expect(result).toBeFalsy();
        }).catch((error) => {
            console.log(error);
        });
    });
    test('Input space only is false', () => {
        database.createThread(' ').then((result) => {
            expect(result).toBeFalsy();
        }).catch((error) => {
            console.log(error);
        });
    });
});


// describe('testing login functionality', () => {
//     test('Input is valid', () => {
//         database.loadUsers('stephen', 'abc123').then((result) => {
//             expect(result).toBeTruthy();
//         }).catch((error) => {
//             console.log(error);
//         });
//     });
//     test('Input is valid', () => {
//         database.createThread('stephe', 'abc234').then((result) => {
//             expect(results).toBeFalsy
//         });
//     });
// });
