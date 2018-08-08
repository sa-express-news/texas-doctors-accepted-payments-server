require('dotenv').config();

import * as rp from 'request-promise';
import * as fs from 'fs';

const apiKey = process.env.DW_API_KEY;

const setConfigObj = (uri: string) => ({
    uri,
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
    },
    json: true,
});

export default (uri: string) => rp(setConfigObj(uri))
    .then((res) => res)
    .catch((err: any) => console.error(err));