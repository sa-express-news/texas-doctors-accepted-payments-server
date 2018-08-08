const base = '/doctorpayments'

// GET request routes
export const GETDOCTORS = `${base}/doctors/:docQuery`;
export const GETPAYMENTS = `${base}/payments/:docID`;

// data.world dataset path
export const DATASETPATH = 'https://api.data.world/v0/sql/expressnews/drug-and-device-industry-payments-accepted-by-tx-doctors';

// data.world sql queries
export const DOCTORSSQLQUERYBASE = 'SELECT doc.name, doc.physician_profile_id, doc.city, doc.zip FROM doctor_reference AS doc';
export const PAYMENTSSQLQUERYBASE = 'SELECT * FROM doctors_payments_with_summaries AS sum WHERE sum.id = ';
