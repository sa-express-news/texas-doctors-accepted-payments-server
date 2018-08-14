import { Request, Response } from 'express';

import pullFromDB from '../pullFromDB';
import { parseDoctorProperties } from '../utils';

// constants
import { DATASETPATH, DOCTORSSQLQUERYBASE } from '../constants';

// interfaces
import { DoctorsParams, DoctorsResponse } from '../interfaces';

export const parseQueryFilters = (docQuery: string) => docQuery.split(/\s+/).map((str: string) => {
    return str.replace(/^[.,\/#!?$%\@^&\*;:{}=\-_`~()]+|[.,\/#!?$%\@^&\*;:{}=\-_`~()]+$/g,"").toUpperCase();
});

export const writeWHEREClause = (filters: string[]) => filters.reduce((res: string, filter: string) => {
    if (filter.length) {
        const operator = !res.length ? 'WHERE' : 'AND';
        res += `${operator} doc.key LIKE "%${filter}%" `;
    }
    return res;
}, '').trim();

export const getSQLQuery = ({ docQuery }: DoctorsParams) => encodeURIComponent(`${DOCTORSSQLQUERYBASE} ${writeWHEREClause(parseQueryFilters(docQuery))}`);

export default async (req: Request, res: Response) => {
    const query: string = getSQLQuery(req.params);
    const docs: DoctorsResponse[] = await pullFromDB(`${DATASETPATH}?query=${query}`);
    if (!docs) {
        res.send('There was an error querying data.world');
    } else {
        res.send(docs.map(parseDoctorProperties));
    }
}