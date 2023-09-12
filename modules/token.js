const signature   = require('../signature');
const helper      = require('../helper');
const reqprom     = require('request-promise');
const is          = require('is_js')
const config      = require('../credential.config');

module.exports = {

  processing: function (req, api_url) {

    const hostname = req.hostname;
    console.log('hostname', hostname)

    delete req.body['back_url']
    req.body.notify_url = "https://rdp-act.cyclic.app/payment_notif"
    if (req.body.api_mode != 'direct_token_api') {
      req.body.redirect_url = "https://rdp-act.cyclic.app/token_redirect?request_mid=" + req.body.mid + "&secret_key=" + req.body.secret_key
      req.body.back_url = "https://rdp-act.cyclic.app/back"
      if (hostname.includes('localhost')) { 
        req.body.redirect_url = "http://localhost:8000/token_redirect"
      }
    }

    if(is.not.existy(req.body.order_id)) {
      req.body.order_id = helper.randomOrderId(req.body)
    }
    
    // console.log("API MODE", req.body.api_mode)
    // if (req.body.api_mode == 'direct_token_api') {
    //   delete req.body['back_url']
    //   delete req.body['redirect_url']
    // }

    delete req.body['endpoint']
    delete req.body['env']
    req.body.signature = signature.generateSignature(req.body)
    delete req.body['secret_key']

    console.log(api_url)
    request_option = {
      url: api_url,
      method: 'POST',
      json: req.body
    }

    return new Promise((resolve, reject)=> {
      reqprom(request_option)
        .then((api_response) => {
          resolve({"request":helper.ksort(req.body), "response":api_response})
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

}
