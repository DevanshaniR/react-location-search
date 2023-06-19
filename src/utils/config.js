const API_KEY = '4339a8357fe547f6a7fc36848fdb7d78';
export const ADDRESS_DATA_API = 'GET_ADDRESS_DATA'

export const getApiUrl = (search_text, api_name) => {
    switch (api_name) {
        case 'GET_ADDRESS_DATA':
            return `https://api.geoapify.com/v1/geocode/autocomplete?text=${search_text}&apiKey=${API_KEY}`;
        default:
            break;
    }
}