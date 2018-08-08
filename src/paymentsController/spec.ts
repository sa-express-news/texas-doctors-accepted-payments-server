import * as test from 'tape';

import { getSQLQuery } from './index';

test('getSQLQuery should return uriencoded sql string with appended doc ID', t => {
    const params = { docID: '111111' };
    const result = getSQLQuery(params);
    const expected = 'SELECT%20*%20FROM%20doctors_payments_with_summaries%20AS%20sum%20WHERE%20sum.id%20%3D%20%20111111';
    t.equal(result, expected);
    t.end();
})
