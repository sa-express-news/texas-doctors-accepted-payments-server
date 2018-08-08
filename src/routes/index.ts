import { Express } from 'express';

import doctorsController     from '../doctorsController';
import paymentsController    from '../paymentsController';

import { GETDOCTORS, GETPAYMENTS } from '../constants';

export const addDoctorsRoute = (app: Express) => app.route(GETDOCTORS).get(doctorsController);
export const addPaymentsRoute = (app: Express) => app.route(GETPAYMENTS).get(paymentsController);

export default (app: Express) => {
    addDoctorsRoute(app);
    addPaymentsRoute(app);
    return app;
};