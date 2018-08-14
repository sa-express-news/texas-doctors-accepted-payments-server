// interfaces
import { DoctorsResponse, PaymentsResponse } from '../interfaces';

export const capitalizeFirstLetter = (str: string, capitalize: RegExp) => {
    const lower = str.toLowerCase().trim();
    // run reduce on both of our possible word separators
    return [' ', '-'].reduce((res, sep) => {
        // split string on separator and iterator over each word
        return res.split(sep).map(word => {
            // if the word matches regex, set to upper case
            if (capitalize && capitalize.test(word)) {
                return word.toUpperCase();
            } else {
                // otherwise, set just the first letter uppercase
                return word[0].toUpperCase() + word.substr(1);
            }
        }).join(sep);
    }, lower);
};

export const parseName = (str: string) => capitalizeFirstLetter(str, /^(iii?|iv)$/);

export const parseAddress = (str: string) => capitalizeFirstLetter(str, /^tx$/);

export const parseHospitalName = (str: string) => str === 'NA' ? str : capitalizeFirstLetter(str, null);

export const parseSentence = (str: string) => str ? str[0].toUpperCase() + str.substr(1).toLowerCase() : str;

const parsePropertiesMap = {
    name: parseName,
    city: parseName,
    company: parseName,
    relatedto: parseName,
    for: parseSentence,
    address: parseAddress,
    teaching_hospital_name: parseHospitalName,
    physician_primary_type: parseSentence,
    specialtyspecific: parseSentence,
};

export const parseProperties = (hash: any, keys: string[]) => keys.reduce((res: any, prop: string) => {
    if (res[prop] && parsePropertiesMap[prop]) {
        res[prop] = parsePropertiesMap[prop](res[prop]);
    }
    return res;
}, hash);

export const parseDoctorProperties = (hash: DoctorsResponse) => parseProperties(hash, ['name', 'city']);

export const parsePaymentProperties = (hash: PaymentsResponse) => parseProperties(hash, ['name', 'city', 'company', 'relatedto', 'for', 'address', 'teaching_hospital_name', 'physician_primary_type', 'specialtyspecific']);
