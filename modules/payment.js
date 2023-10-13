const signature   = require('../signature');
const helper      = require('../helper');
const reqprom     = require('request-promise');
const is          = require('is_js')
const config      = require('../credential.config');
const { exit }    = require('yargs');
// const gc_logger   = require('./gc_logger')

module.exports = {

  direct_processing: function (payload, api_url) {

    const hostname = 'http://localhost';
    if(is.not.existy(payload.notify_url)) {
      payload.notify_url = "https://rdp-act.cyclic.app/payment_notif"
    }
    if(is.not.existy(payload.redirect_url)) {
      suffix = {"request_mid":req.body.mid,"secret_key":req.body.secret_key,"env":req.body.env}
      console.log(suffix)

      suffix_encoded = Buffer.from(JSON.stringify(suffix)).toString('base64')

      payload.redirect_url = "https://rdp-act.cyclic.app/payment_redirect/"+suffix_encoded
      if (hostname.includes('localhost')) {
        payload.redirect_url = "http://localhost:8000/payment_redirect/"+suffix_encoded
      }
    }
    if(is.not.existy(payload.back_url)) {
      payload.back_url = "https://rdp-act.cyclic.app/back"
      if (hostname.includes('localhost')) { 
        payload.back_url = "http://localhost:8000/back"
      } 
    }
    if (payload.api_mode == 'direct_n3d' || payload.api_mode == 'direct_3d') {
      delete payload['back_url']
      delete payload['redirect_url']
    }

    if(is.existy(payload.card)){
      card = JSON.parse(payload.card)
      payload.card_no = card.card_no
      payload.cvv2 = card.cvv
      payload.exp_date = card.exp_month + card.exp_year
    }

    full_stop = false;
    full_stop_reason = [];
    if(is.not.existy(payload.payer_id)) {
      if (payload.api_mode == 'redirection_sop' || payload.api_mode == 'direct_n3d' || payload.api_mode == 'direct_3d' ) {
        // if (is.not.existy(payload.cvv2)) {
        //   full_stop = true;
        //   full_stop_reason.push("cvv2")
        // }
        if (is.not.existy(payload.card_no)) {
          full_stop = true;
          full_stop_reason.push("card_no")
        }
        // if (is.not.existy(payload.exp_date)) {
        //   full_stop = true;
        //   full_stop_reason.push("exp_date")
        // }
      }
    }

    if(is.not.existy(payload.order_id)) {
      payload.order_id = helper.randomOrderId(payload)
    }
    
    if(is.not.existy(payload.amount)) {
      payload.amount = helper.randomNumber(payload.ccy)
    }

    if(full_stop) {
      message = "Missing parameter: "+full_stop_reason.join(", ");
      return {"response": message, "request": payload}
      exit;
    }

    console.log(payload)

    payload.signature = signature.paymentSignature(payload)
    delete payload['secret_key']
    delete payload['env']
    delete payload['endpoint']
    delete payload['card']
    
    request_option = {
      url: api_url,
      method: 'POST',
      json: payload
    }

    // gc_logger.request_payment(payload);
    return new Promise((resolve, reject)=> {
      reqprom(request_option)
        .then((api_response) => {
          // gc_logger.payment_url(api_response);
          resolve({"response":api_response, "request":helper.ksort(payload)})
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  processing: function (req, api_url) {

    const hostname = req.hostname;

    let xrl = req.protocol +'s'+ '://' + req.headers.host
    
    if(is.not.existy(req.body.notify_url)) {
      req.body.notify_url = xrl+"/payment_notif"
    }

    if (hostname.includes('localhost')) { 
      req.body.notify_url = "https://rdp-act.cyclic.app/payment_notif"
    } 

    if(is.not.existy(req.body.redirect_url)) {
      suffix = {"request_mid":req.body.mid,"secret_key":req.body.secret_key,"env":req.body.env}
      console.log(suffix)

      suffix_encoded = Buffer.from(JSON.stringify(suffix)).toString('base64')
      
      req.body.redirect_url = xrl+"/payment_redirect/"+suffix_encoded
      if (hostname.includes('localhost')) { 
        req.body.redirect_url = "http://localhost:8000/payment_redirect/"+suffix_encoded
      } 
    }
    if(is.not.existy(req.body.back_url)) {
      req.body.back_url = xrl+"/back"
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
      if(is.not.existy(req.body.cvv2)) {
        req.body.cvv2 = card.cvv
      }
      req.body.exp_date = card.exp_month + card.exp_year
      req.body.merchant_reference = card.case
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
  
  redirect: function(req, data) {

    api_url = data.api_url.payment_redirect
    delete data['api_url']
    
    if(req.method == 'POST') {
      data = {};
      data.request_mid = req.body['request_mid']
      data.secret_key = req.body['secret_key']
      data.transaction_id = req.body['transaction_id']
    }
    
    data.signature = signature.signGeneric(data.secret_key, data);

    console.log(data)
    request_option  = {
      url: api_url,
      method: 'POST',
      json: data
    }
    
    return new Promise((resolve, reject) => {
      reqprom(request_option)
      .then((api_response) => {
        // gc_logger.payment_response(api_response, 'redirection');

        resolve({"request":data, "response":api_response, "api_url": api_url})
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  paymentstring: function (req, api_url) {
    if(is.not.existy(req.body.notify_url)) {
      req.body.notify_url = "https://rdp-act.cyclic.app/payment_notif"
    }
    req.body.redirect_url = "https://rdp-act.cyclic.app/payment_redirect?request_mid=" + req.body.mid + "&secret_key=" + req.body.secret_key
    req.body.back_url = "https://rdp-act.cyclic.app/back"
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

    if(is.existy(req.body.recurring_mod)){
      req.body.recurring_amount = helper.randomNumber(req.body.ccy)
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
