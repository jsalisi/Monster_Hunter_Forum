var currentUser = [];
var dbObject = {
    Stephen: 1,
    length: null
};

var checkLogin = (dbObject) => {
    for (var key in dbObject) {
        if ((key != 'length')&&( key != 'key') && (key != 'getItem') && (key != 'setItem') && (key != 'clear') && (key != 'removeItem')) {
            currentUser = key
            return currentUser
        }
    }
}

describe('Testing for basic checkLogin functionality', () => {
    test("test to see if function returns the correct type of data", () => {
        expect(checkLogin(dbObject)).toBe('Stephen')
    });
});
