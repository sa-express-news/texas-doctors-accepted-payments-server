import * as test from 'tape';

import { parseName, parseAddress, parseSentence, parseHospitalName, extractLastName, orderByLastName, orderByDate } from './index';

test('parseName should return string with first letter of each word capitalized unless they are roman numerals', t => {
    let result = parseName('KING JAMES III');
    let expected = 'King James III';
    t.equal(result, expected);
    t.end();
});

test('parseAddress should return string with first letter of each word capitalized unless they are state abbr', t => {
    let result = parseAddress('4202 SAN PEDRO AVE NA, SAN ANTONIO, TX 78212');
    let expected = '4202 San Pedro Ave Na, San Antonio, TX 78212';
    t.equal(result, expected);
    t.end();
});

test('parseSentence should return string with first letter capitalized', t => {
    let result = parseSentence('I AM THE GOD OF HELLFIRE');
    let expected = 'I am the god of hellfire';
    t.equal(result, expected);
    t.end();
});

test('parseHospitalName should return string with first letter of each word capitalized unless the string is "NA"', t => {
    let result = parseHospitalName('QUACKTASTIC MEDICAL CENTER    ');
    let expected = 'Quacktastic Medical Center';
    t.equal(result, expected);

    result = parseHospitalName('NA');
    expected = 'NA'
    t.equal(result, expected);

    t.end();
});

test('extractLastName should identify and pluck the last name from a name string', t => {
    let doctor = {
        name: 'Johnny Ballsagna III',
        city: 'Austin',
        physician_profile_id: 78867,
        zip: '78215',
    }

    let result = extractLastName(doctor);
    let expected = 'Ballsagna III';
    t.equal(result, expected);

    doctor.name = 'Hip Hop Hippo'
    result = extractLastName(doctor);
    expected = 'Hippo';
    t.equal(result, expected);

    doctor.name = 'Mr. T';
    result = extractLastName(doctor);
    expected = 'T';
    t.equal(result, expected);

    doctor.name = 'Beef Knuckles Jr';
    result = extractLastName(doctor);
    expected = 'Knuckles Jr';
    t.equal(result, expected);

    doctor.name = 'Beef Knuckles Jruuush';
    result = extractLastName(doctor);
    expected = 'Jruuush';
    t.equal(result, expected);

    t.end();
});

test('orderByLastName should order an array of doctors by their last names', t => {
    const doctors = [
        {
            name: 'Jimmy Johns',
            city: 'Austin',
            physician_profile_id: 78867,
            zip: '78215',
        },
        {
            name: 'Hip Hop Hippo',
            city: 'Austin',
            physician_profile_id: 78867,
            zip: '78215',
        },
        {
            name: 'Beef Apostrophe Jr',
            city: 'Austin',
            physician_profile_id: 78867,
            zip: '78215',
        },
        {
            name: 'Johnny Ballsagna III',
            city: 'Austin',
            physician_profile_id: 78867,
            zip: '78215',
        },
    ];
    let result = orderByLastName(doctors);
    let expected = [
        {
            name: 'Beef Apostrophe Jr',
            city: 'Austin',
            physician_profile_id: 78867,
            zip: '78215',
        },
        {
            name: 'Johnny Ballsagna III',
            city: 'Austin',
            physician_profile_id: 78867,
            zip: '78215',
        },
        {
            name: 'Hip Hop Hippo',
            city: 'Austin',
            physician_profile_id: 78867,
            zip: '78215',
        },
        {
            name: 'Jimmy Johns',
            city: 'Austin',
            physician_profile_id: 78867,
            zip: '78215',
        },
    ];
    t.deepEqual(result, expected);
    t.end();
});

test('orderByDate should order an array of payments by payment date', t => {
    const payments = [
        {
            name: "GEORGE M. GALVAN",
            id: 328757,
            paydate: "2017-05-12",
            amount: "$115.44",
            paycount: 1,
            company: "NEVRO CORP.",
            relatedtoaproduct: true,
            relatedto: "SENZA SPINAL CORD STIMULATION SYSTEM",
            for: "FOOD AND BEVERAGE",
            address: "4410 MEDICAL DR STE 610 NA, SAN ANTONIO, TX 78229",
            teaching_hospital_name: "NA",
            city: "SAN ANTONIO",
            zip: "78229",
            physician_primary_type: "MEDICAL DOCTOR",
            specialtyspecific: "NEUROLOGICAL SURGERY",
            count_companies: 13,
            paysum: 194894.44000000003,
            number_payments: 173,
            count_product: 32
        },
        {
            name: "GEORGE M. GALVAN",
            id: 328757,
            paydate: "2017-11-08",
            amount: "$66.34",
            paycount: 1,
            company: "NEVRO CORP.",
            relatedtoaproduct: true,
            relatedto: "SENZA SPINAL CORD STIMULATION SYSTEM",
            for: "FOOD AND BEVERAGE",
            address: "4410 MEDICAL DR STE 610 NA, SAN ANTONIO, TX 78229",
            teaching_hospital_name: "NA",
            city: "SAN ANTONIO",
            zip: "78229",
            physician_primary_type: "MEDICAL DOCTOR",
            specialtyspecific: "NEUROLOGICAL SURGERY",
            count_companies: 13,
            paysum: 194894.44000000003,
            number_payments: 173,
            count_product: 32
        },
        {
            name: "GEORGE M. GALVAN",
            id: 328757,
            paydate: "2017-01-31",
            amount: "$11.77",
            paycount: 1,
            company: "PROVIDENCE MEDICAL TECHNOLOGY, INC.",
            relatedtoaproduct: true,
            relatedto: "CAVUX CERVICAL CAGE, DTRAX SPINAL SYSTEM, ALLY BONE SCREW, BIOLOGIX ALLOGRAFT BONE ",
            for: "FOOD AND BEVERAGE",
            address: "4410 MEDICAL DR STE 610 NA, SAN ANTONIO, TX 78229",
            teaching_hospital_name: "NA",
            city: "SAN ANTONIO",
            zip: "78229",
            physician_primary_type: "MEDICAL DOCTOR",
            specialtyspecific: "NEUROLOGICAL SURGERY",
            count_companies: 13,
            paysum: 194894.44000000003,
            number_payments: 173,
            count_product: 32
        },
    ];
    let result = orderByDate(payments);
    let expected = [
        {
            name: "GEORGE M. GALVAN",
            id: 328757,
            paydate: "2017-01-31",
            amount: "$11.77",
            paycount: 1,
            company: "PROVIDENCE MEDICAL TECHNOLOGY, INC.",
            relatedtoaproduct: true,
            relatedto: "CAVUX CERVICAL CAGE, DTRAX SPINAL SYSTEM, ALLY BONE SCREW, BIOLOGIX ALLOGRAFT BONE ",
            for: "FOOD AND BEVERAGE",
            address: "4410 MEDICAL DR STE 610 NA, SAN ANTONIO, TX 78229",
            teaching_hospital_name: "NA",
            city: "SAN ANTONIO",
            zip: "78229",
            physician_primary_type: "MEDICAL DOCTOR",
            specialtyspecific: "NEUROLOGICAL SURGERY",
            count_companies: 13,
            paysum: 194894.44000000003,
            number_payments: 173,
            count_product: 32
        },
        {
            name: "GEORGE M. GALVAN",
            id: 328757,
            paydate: "2017-05-12",
            amount: "$115.44",
            paycount: 1,
            company: "NEVRO CORP.",
            relatedtoaproduct: true,
            relatedto: "SENZA SPINAL CORD STIMULATION SYSTEM",
            for: "FOOD AND BEVERAGE",
            address: "4410 MEDICAL DR STE 610 NA, SAN ANTONIO, TX 78229",
            teaching_hospital_name: "NA",
            city: "SAN ANTONIO",
            zip: "78229",
            physician_primary_type: "MEDICAL DOCTOR",
            specialtyspecific: "NEUROLOGICAL SURGERY",
            count_companies: 13,
            paysum: 194894.44000000003,
            number_payments: 173,
            count_product: 32
        },
        {
            name: "GEORGE M. GALVAN",
            id: 328757,
            paydate: "2017-11-08",
            amount: "$66.34",
            paycount: 1,
            company: "NEVRO CORP.",
            relatedtoaproduct: true,
            relatedto: "SENZA SPINAL CORD STIMULATION SYSTEM",
            for: "FOOD AND BEVERAGE",
            address: "4410 MEDICAL DR STE 610 NA, SAN ANTONIO, TX 78229",
            teaching_hospital_name: "NA",
            city: "SAN ANTONIO",
            zip: "78229",
            physician_primary_type: "MEDICAL DOCTOR",
            specialtyspecific: "NEUROLOGICAL SURGERY",
            count_companies: 13,
            paysum: 194894.44000000003,
            number_payments: 173,
            count_product: 32
        }
    ];
    t.deepEqual(result, expected);
    t.end();
});
