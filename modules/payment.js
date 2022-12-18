const signature   = require('../signature');
const helper      = require('../helper');
const reqprom     = require('request-promise');
const is          = require('is_js')
const config      = require('../credential.config');
const { exit }    = require('yargs');
// const gc_logger   = require('./gc_logger')

module.exports = {

  processing: function (req, api_url) {

    const hostname = req.hostname;
    if(is.not.existy(req.body.notify_url)) {
      req.body.notify_url = "https://rdp-act.up.railway.app/payment_notif"
    }
    if(is.not.existy(req.body.redirect_url)) {
      req.body.redirect_url = "https://rdp-act.up.railway.app/payment_redirect?request_mid=" + req.body.mid + "&secret_key=" + req.body.secret_key
      if (hostname.includes('localhost')) { 
        req.body.redirect_url = "http://localhost:8000/payment_redirect?request_mid=" + req.body.mid + "&secret_key=" + req.body.secret_key
      } 
    }
    if(is.not.existy(req.body.back_url)) {
      req.body.back_url = "https://rdp-act.up.railway.app/back"
      if (hostname.includes('localhost')) { 
        req.body.back_url = "http://localhost:8000/back"
      } 
    }
    if (req.body.api_mode == 'direct_n3d' || req.body.api_mode == 'direct_3d') {
      delete req.body['back_url']
      delete req.body['redirect_url']
    }

    if(is.existy(req.body.card)){
      card = JSON.parse(req.body.card)
      req.body.card_no = card.card_no
      req.body.cvv2 = card.cvv
      req.body.exp_date = card.exp_month + card.exp_year
    }

    full_stop = false;
    full_stop_reason = [];
    if(is.not.existy(req.body.payer_id)) {
      if (req.body.api_mode == 'redirection_sop' || req.body.api_mode == 'direct_n3d' || req.body.api_mode == 'direct_3d' ) {
        // if (is.not.existy(req.body.cvv2)) {
        //   full_stop = true;
        //   full_stop_reason.push("cvv2")
        // }
        if (is.not.existy(req.body.card_no)) {
          full_stop = true;
          full_stop_reason.push("card_no")
        }
        // if (is.not.existy(req.body.exp_date)) {
        //   full_stop = true;
        //   full_stop_reason.push("exp_date")
        // }
      }
    }

    if(is.not.existy(req.body.order_id)) {
      req.body.order_id = helper.randomOrderId(req.body)
    }
    
    if(is.not.existy(req.body.amount)) {
      req.body.amount = helper.randomNumber(req.body.ccy)
    }

    if(full_stop) {
      message = "Missing parameter: "+full_stop_reason.join(", ");
      return {"response": message, "request": req.body}
      exit;
    }

    console.log(req.body)

    req.body.signature = signature.paymentSignature(req.body)
    delete req.body['secret_key']
    delete req.body['env']
    delete req.body['endpoint']
    delete req.body['card']
    
    request_option = {
      url: api_url,
      method: 'POST',
      json: req.body
    }

    // gc_logger.request_payment(req.body);
    return new Promise((resolve, reject)=> {
      reqprom(request_option)
        .then((api_response) => {
          // gc_logger.payment_url(api_response);
          resolve({"response":api_response, "request":helper.ksort(req.body)})
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  
  redirect: function(req, api_url) {
    var credential = config.get()  

    data = {};
    console.log('Api URL', api_url.payment_redirect)
    data.request_mid = req.query.request_mid
    data.secret_key = req.query.secret_key
    data.transaction_id = req.query.transaction_id

    if(req.method == 'POST') {
      data.request_mid = req.body['request_mid']
      data.secret_key = req.body['secret_key']
      data.transaction_id = req.body['transaction_id']
    }

    data.signature = signature.signGeneric(data.secret_key, data);

    console.log(data)
    request_option  = {
      url: api_url.payment_redirect,
      method: 'POST',
      json: data
    }
    
    return new Promise((resolve, reject) => {
      reqprom(request_option)
      .then((api_response) => {
        // gc_logger.payment_response(api_response, 'redirection');
        resolve({"request":data, "response":api_response})
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  paymentstring: function (req, api_url) {
    if(is.not.url(req.body.notify_url)) {
      req.body.back_url = "https://rdp-act.up.railway.app/notif"
    }
    req.body.redirect_url = "https://rdp-act.up.railway.app/payment_redirect?request_mid=" + req.body.mid + "&secret_key=" + req.body.secret_key
    req.body.back_url = "https://rdp-act.up.railway.app/back"
    if (req.body.api_mode == 'direct_n3d' || req.body.api_mode == 'direct_3d') {
      delete req.body['back_url']
      delete req.body['redirect_url']
    }  
    
    console.log(req.body)
    
    if(is.not.existy(req.body.order_id)) {
      req.body.order_id = helper.randomOrderId(req.body)
    }

    if(is.not.existy(req.body.amount)) {
      req.body.amount = helper.randomNumber(req.body.ccy)
    }

    req.body.signature = signature.paymentSignature(req.body)
    delete req.body['secret_key']
    delete req.body['env']
    delete req.body['endpoint']

    console.log(helper.ksort(req.body))
    console.log("API URL", api_url.payment)

    request_option = {
      url: api_url.payment,
      method: 'POST',
      json: req.body
    }

    return request_option;
  },
}
