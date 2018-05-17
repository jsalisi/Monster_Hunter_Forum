var foobar = (foo) => {
    return 'bar'
}

describe('used to pass travis', async () => {
    test("used to pass", () => {
        expect(foobar('foo')).toBe('bar')
    });
});