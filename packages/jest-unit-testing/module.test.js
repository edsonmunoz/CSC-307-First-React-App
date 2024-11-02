import mut from './module.js';

test('Testing sum -- success', () => {
    const expected = 30;
    const got = mut.sum(12, 18);
    expect(got).toBe(expected);
});

test('Testing sum -- success', () => {
    const expected = 0;
    const got = mut.sum(0, 0);
    expect(got).toBe(expected);
});

test('Testing sum -- success', () => {
    const expected = 5;
    const got = mut.sum(5, 0);
    expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = 6;
    const got = mut.div(6, 1);
    expect(got).toBe(expected);
})

test('Testing div -- success', () => {
    const expected = 0;
    const got = mut.div(0,60);
    expect(got).toBe(expected);
})

test('Testing div -- success', () => {
    const expected = 5;
    const got = mut.div(30, 6);
    expect(got).toBe(expected);
});

test('Testing containsNumber -- success', () => {
    const expected = true;
    const got = mut.containsNumbers('intense47');
    expect(got).toBe(expected);
});

test('Testing containsNumber -- success', () => {
    const expected = false;
    const got = mut.containsNumbers('intense');
    expect(got).toBe(expected);
});

test('Testing containsNumber -- success', () => {
    const expected = true;
    const got = mut.containsNumbers('inten7se');
    expect(got).toBe(expected);
});

test('Testing containsNumber -- success', () => {
    const expected = false;
    const got = mut.containsNumbers('');
    expect(got).toBe(expected);
});