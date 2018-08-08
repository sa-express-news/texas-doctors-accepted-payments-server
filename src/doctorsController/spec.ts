import * as test from 'tape';

import { parseQueryFilters, writeWHEREClause, getSQLQuery } from './index';

test('parseQueryFilters should take a string, split on space, trim out punctuation on edge of words and capitalize', t => {
    const result = parseQueryFilters('hello     world!! I &AM Luke A, find me @ express-news');
    const expected = ['HELLO', 'WORLD', 'I', 'AM', 'LUKE', 'A', 'FIND', 'ME', '', 'EXPRESS-NEWS'];
    t.deepEqual(result, expected);
    t.end();
});

test('writeWHEREClause should take array of strings and construct SQL WHERE clause from them using LIKE & AND operators', t => {
    const result = writeWHEREClause(['', 'HELLO', 'BIG', '', 'WORLD']);
    const expected = 'WHERE doc.key LIKE "%HELLO%" AND doc.key LIKE "%BIG%" AND doc.key LIKE "%WORLD%"';
    t.equal(result, expected);
    t.end();
});

test('getSQLQuery should take a string of filter keywords and return SQL query', t => {
    const params = { docQuery: 'luke whyte, san antonio, 78215' };
    const result = getSQLQuery(params);
    const expected = 'SELECT%20doc.name%2C%20doc.physician_profile_id%2C%20doc.city%2C%20doc.zip%20FROM%20doctor_reference%20AS%20doc%20WHERE%20doc.key%20LIKE%20%22%25LUKE%25%22%20AND%20doc.key%20LIKE%20%22%25WHYTE%25%22%20AND%20doc.key%20LIKE%20%22%25SAN%25%22%20AND%20doc.key%20LIKE%20%22%25ANTONIO%25%22%20AND%20doc.key%20LIKE%20%22%2578215%25%22';
    t.equal(result, expected);
    t.end();
});
