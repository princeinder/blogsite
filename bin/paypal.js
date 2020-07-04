var paypal = require('paypal-rest-sdk');


//var client_id = 'AboeoKAhcd4JYX5RpWMAHSz6KqqiuklOIPXDdTyCjShHxm0vfeFA6hSPYYwO0tuG8N72KrWEyK';
//var secret = 'EHSSq3CVZadgD1wsPlbp5LXWLXL_aNQFSEXHqIaKiErWj2HBYCqVtgF0EMFx-50jHhUdPR5GaoJWXL56';


var client_id = 'ATWseYcQURjwkYOCh3SQayvzFeow6TRMwAzQGdSt2XPZDU6HA57QqoJanoX3y6KBhy4KkqL3Ng1I_NNU';
var secret = 'EK58VJ57zQezSrp5-6bUZfSFAEuQNm7jpHaX-TqEvKkSja2H_-wulUm_IkBc2F5O6gPhNZaqj3CgBXys';


//AboeoKAhcd4JYX5RpWMAHSz6KqqiuklOIPXDdTyCjShHxm0vfeFA6hSPYYwO0tuG8N72KrWEyK

//EHSSq3CVZadgD1wsPlbp5LXWLXL_aNQFSEXHqIaKiErWj2HBYCqVtgF0EMFx-50jHhUdPR5GaoJWXL56
//configure for sandbox environment
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': client_id,
    'client_secret': secret
});