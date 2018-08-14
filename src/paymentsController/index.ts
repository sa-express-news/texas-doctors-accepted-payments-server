import { Request, Response } from 'express';

import pullFromDB from '../pullFromDB';
import { parsePaymentProperties } from '../utils';

// constants
import { DATASETPATH, PAYMENTSSQLQUERYBASE } from '../constants';

// interfaces
import { PaymentsParams, PaymentsResponse } from '../interfaces';

export const getSQLQuery = ({ docID }: PaymentsParams) => encodeURIComponent(`${PAYMENTSSQLQUERYBASE} ${docID}`);

export default async (req: Request, res: Response) => {
    const query: string = getSQLQuery(req.params);
    const payments: PaymentsResponse[] = await pullFromDB(`${DATASETPATH}?query=${query}`);
    if (!payments) {
        res.send('There was an error querying data.world');
    } else {
        res.send(payments.map(parsePaymentProperties));
    }
}