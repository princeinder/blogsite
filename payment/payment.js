var paypal = require('paypal-rest-sdk');

async function paypalPayment(req,res,next){
    var payReq = JSON.stringify({
        'intent':'sale',
        'redirect_urls':{
            'return_url':'/process',
            'cancel_url':'/register/'+req.params.id
        },
        'payer':{
            'payment_method':'paypal'
        },
        'transactions':[{
            'amount':{
                'total':'7.47',
                'currency':'USD'
            },
            'description':'This is the payment transaction description.'
        }]
    });

    paypal.payment.create(payReq, function(error, payment){
        if(error){
            console.error(error);
        } else {
            var links = {};
            payment.links.forEach(function(linkObj){
                links[linkObj.rel] = {
                    'href': linkObj.href,
                    'method': linkObj.method
                };
            })
        
            //if redirect url present, redirect user
            if (links.hasOwnProperty('approval_url')){
                res.redirect(links['approval_url'].href);
            } else {
                console.error('no redirect URI present');
            }
        }
    }); 
}


module.exports={ paypalPayment }


