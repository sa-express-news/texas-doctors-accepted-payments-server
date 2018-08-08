export interface DoctorsParams {
    docQuery: string;
}

export interface DoctorsResponse {
    name: string;
    physician_profile_id: string;
    city: string;
    zip: string;
}

export interface PaymentsParams {
    docID: string;
}

export interface PaymentsResponse {
    name: string;
    id: number;
    paydate: string;
    amount: string;
    paycount: number;
    company: string;
    relatedtoaproduct: boolean;
    relatedto: string;
    for: string;
    address: string;
    teaching_hospital_name: string;
    city: string;
    zip: string;
    physician_primary_type: string;
    specialtyspecific: string;
    count_companies: number;
    paysum: number;
    number_payments: number;
    count_product: number;
}