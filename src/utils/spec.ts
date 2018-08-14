import * as test from 'tape';

import { parseName, parseAddress, parseSentence, parseHospitalName } from './index';

test('parseName should return string with first letter of each word capitalized unless they are roman numerals', t => {
    const result = parseName('KING JAMES III');
    const expected = 'King James III';
    t.equal(result, expected);
    t.end();
});

test('parseAddress should return string with first letter of each word capitalized unless they are state abbr', t => {
    const result = parseAddress('4202 SAN PEDRO AVE NA, SAN ANTONIO, TX 78212');
    const expected = '4202 San Pedro Ave Na, San Antonio, TX 78212';
    t.equal(result, expected);
    t.end();
});

test('parseSentence should return string with first letter capitalized', t => {
    const result = parseSentence('I AM THE GOD OF HELLFIRE');
    const expected = 'I am the god of hellfire';
    t.equal(result, expected);
    t.end();
});

test('parseHospitalName should return string with first letter of each word capitalized unless the string is "NA"', t => {
    let result = parseHospitalName('QUACKTASTIC MEDICAL CENTER');
    let expected = 'Quacktastic Medical Center';
    t.equal(result, expected);

    result = parseHospitalName('NA');
    expected = 'NA'
    t.equal(result, expected);

    t.end();
});
