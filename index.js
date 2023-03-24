// require('dotenv').config()
const express    = require('express')
const moment     = require('moment')
const bodyParser = require('body-parser')
const helper     = require('./helper');
const signature  = require('./signature');
const sha512     = require('js-sha512')
const is         = require('is_js')
const _          = require('underscore')
const config     = require('./credential.config');
const app        = express()
const port       = process.env.PORT || 8000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var credential = config.get()
var env = 'test'
var api_url    = config.urls(env)

var slack = require('./modules/slack');
const { exit } = require('yargs');
const httprequest = require('./modules/httprequest');

app.get('/', function (req, res) {

  if (is.existy(req.body.env)) {
    api_url = config.urls(req.body.env)
  }

  response = 'Please check <a href="https://reddotpayment.atlassian.net/wiki/spaces/ID/pages/1218379777/Testing+tools">this page</a> for complete documentation';

  res.send(response)
})

/**
 * For Hosted order page (HOP) card detail is inputted in RDP payment page
 * can support redirection_hosted, sop, direct_n3d
 */
app.post('/payment', function (req, res) {

  console.log('hostname',req.protocol)
  console.log('hostname',req.protocol + '://' + req.get('host'))
  console.log("")
  console.log("****************** PAYMENTS ******************")
  console.log("********** " +moment().format('YYYY-MM-DD, HH:mm:ss.SSS')+ " **********")

  if(is.existy(req.body.endpoint)) {
    api_url = req.body.endpoint
  }
  else {
    urls = config.urls(req.body.env)
    api_url = urls.payment
  }

  console.log('api_url',api_url)

  var payment = require('./modules/payment')

  async function f() {
    try {
      var result = await payment.processing(req, api_url);
      console.log(result)
      // slack.webhook_paymenturl(result) 
      if(req.body.api_mode == 'direct_n3d') {
        slack.webhook_notif(result.response)
      }
      res.send(result)
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  f().then((val) => {
    res.send(val)
  })
})

/**
 * Process the inquiry during payment redirection
 */
app.get('/payment_redirect', function (req, res) {
  console.log("")
  console.log("PAYMENTS REDIRECTION HANDLING")
  console.log(moment().format('YYYY-MM-DD, HH:mm:ss.SSS'))

  if (is.existy(req.body.env)) {
    api_url = config.urls(req.body.env)
  } else {
    api_url = config.urls('test')
  }

  var payment = require('./modules/payment')

  async function f() {
    try {
      var result = await payment.redirect(req, api_url);
      res.send(result)
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  f().then((val) => {
    res.send(val)
    // console.log("Pak Yaddi", val)
  })
})

app.post('/payment_redirect', function (req, res) {
  console.log("")
  console.log("PAYMENTS REDIRECTION HANDLING")
  console.log(moment().format('YYYY-MM-DD, HH:mm:ss.SSS'))

  if (is.existy(req.body.env)) {
    api_url = config.urls(req.body.env)
  } else {
    api_url = config.urls('test')
  }

  var payment = require('./modules/payment')

  async function f() {
    try {
      var result = await payment.redirect(req, api_url);
      res.send(result)
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  f().then((val) => {
    res.send(val)
  })
})

app.post('/token', function (req, res, next) {
  console.log("")
  console.log("****************** TOKEN ******************")
  console.log("********** " +moment().format('YYYY-MM-DD, HH:mm:ss.SSS')+ " **********")

  if(is.existy(req.body.endpoint)) {
    api_url = req.body.endpoint
  }
  else {
    urls = config.urls(req.body.env)
    api_url = urls.token
  }

  // res.send(api_url)

  token = require('./modules/token')
  async function f() {
    try {
      var result = await token.processing(req, api_url);
      console.log(result)
      slack.webhook_paymenturl(result)
      res.send(result)
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  f().then((val) => {
    res.send(val)
  })
})

app.get('/token_redirect', function (req, res) {
  console.log("")
  console.log("TOKEN REDIRECTION HANDLING")
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
  data = {};
  data.request_mid    = req.query.request_mid
  data.secret_key     = req.query.secret_key
  data.transaction_id = req.query.transaction_id
  data.signature      = signature.signGeneric(data.secret_key, data);

  var request = require('request');
  request(
    {
      url: api_url.token_redirect,
      method : 'POST',
      json   : data
    },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      // should be redirect the app.get('/redirected', ...)

      res.send(body)
    }
  );
})

app.post('/token_redirect', function (req, res) {
  console.log("")
  console.log("TOKEN REDIRECTION HANDLING")
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
  data = {};
  data.request_mid    = req.body.request_mid
  data.secret_key     = req.body.secret_key
  data.transaction_id = req.body.transaction_id
  data.signature      = signature.signGeneric(data.secret_key, data);

  var request = require('request');
  request(
    {
      url: api_url.token_redirect,
      method : 'POST',
      json   : data
    },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      // should be redirect the app.get('/redirected', ...)

      res.send(body)
    }
  );
})


// Transaction status
app.post('/check_status', function (req, res) {
  console.log("")
  console.log("Check Status")
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
  data = {};
  data.request_mid    = req.body.request_mid
  data.secret_key     = req.body.secret_key
  data.transaction_id = req.body.transaction_id
  data.signature      = signature.signGeneric(data.secret_key, data);

  console.log(req.body)
  var request = require('request');
  request(
    {
      url: api_url.check_status_api,
      method : 'POST',
      json   : data
    },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      // should be redirect the app.get('/redirected', ...)

      res.send(body)
    }
  );
})

/**
 * Merchant Capture
 */
app.post('/merchant', function(req, res, next) {
  // require('https').globalAgent.options.ca = require('ssl-root-cas').create();

  if(is.existy(req.body.endpoint)) {
    api_url = req.body.endpoint
  }
  else {
    urls = config.urls(req.body.env)
    api_url = urls.merchant_api
  }

  switch(req.body.action_type) {
    case "capture": console.log("************** MERCHANT - CAPTURE **************")
    break;
    case "refund": console.log("*************** MERCHANT - REFUND **************")
    break;
    default: console.log("**************** MERCHANT - VOID ***************")
  }
  console.log("*********** " +moment().format('YYYY-MM-DD, HH:mm:ss.SSS')+ " ***********")

  delete req.body['endpoint']
  delete req.body['env'];
  req.body.signature = signature.md5Signature(req.body);

  delete req.body['secret_key'];
  console.log(helper.ksort(req.body))

  var request = require('request').defaults({strictSSL: false});

  try {
    request(
      {
        url: api_url,
        method: 'POST',
        form: helper.ksort(req.body)
      },
      function optionalCallback(err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
        }
        slack.merchantApi_notif({"request":req.body, "response":JSON.parse(body)})
        // should be redirect the app.get('/redirected', ...)
        res.send({"request":req.body, "response":JSON.parse(body)})
      }
    );
  } catch (error) {
    console.log(error)
  }


})

/**
 * ps: presignature
 * Generate pre signature string. A long string before we hash it with sha512
 */
app.post('/ps', function(req,res) {
  console.log(req.body);
  delete(req.body.signature)
  var data = signature.flatString(req.body);
  res.send(data)
})


// gs: generic signature
// Generate signature for payment api
// Can be use to generate signature and request parameters for payment API
app.post('/gs', function(req,res) {
  console.log("")
  console.log("************ GENERATING SIGNATURE ************")
  console.log("********** " +moment().format('YYYY-MM-DD, HH:mm:ss.SSS')+ " **********")

  if (is.existy(req.body.env)) {
    api_url = config.urls(req.body.env)
  }

  payment = require('./modules/payment')
  async function f() {
    try {
      var result = await payment.paymentstring(req, api_url);
      console.log(result)
      res.send(result)
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  f().then((val) => {
    res.send(val)
  })

})


/**
 * ts: token signature
 * generate generic signature, work for generating signature for token
 */
app.post('/ts', function(req, res) {
  req.body.signature = signature.generateSignature(req.body)
  delete(req.body.secret_key)
  sorted_data  = helper.ksort(req.body)
  console.log(sorted_data);

  res.send(sorted_data)

})

/**
 * Validate signature
 */
app.post('/vs', function(req,res) {
  secret_key = ''
  if(req.body.secret_key) {
    secret_key = req.body.secret_key
  }
  // console.log('mid: ', mid);
  // console.log('secret_key: ', secret_key);
  delete(req.body.signature)
  
  presignature = signature.signGeneric(secret_key, req.body)
  sign = signature.isValidSignature(req.body, secret_key)
  
  console.log(sign);
  res.send({"sorted_date": sorted_data, "presignature": presignature, "signature": sign})
})

/**
 * Validate signature
 */
app.post('/ro', function(req,res) {
  data = helper.ksort(req.body)
  res.send(data)
})


app.post('/hash', function(req,res) {
  var hash = sha512(req.body.data)
  var signature = sha512(hash)

  console.log(signature);
  res.send(signature)
})

app.get('/back', function (req, res) {
  // var payment = require('./modules/payment')
  // payment.redirect(req, res, api_url);
  res.send('back')
})


/**
 * Instant collect save
 */
app.post('/invoice/create', function (req, res, next) {
  console.log("")
  console.log("INSTANT COLLECT API - CREATE INVOICE")
  console.log(moment().format('MMM Do YYYY, h:mm:ss a'))

  if (is.existy(req.body.env)) {
    api_url = config.urls(req.body.env)
  }

  var invoice = require('./modules/instantcollect')
  if(is.existy(req.body.itemcount)) {
    req.body.details = req.items = invoice.generateRandomItem(req.body.itemcount);
  }
  
  async function f() {
    try {
      var result = await invoice.create(req, api_url);
      console.log(result)
      slack.integration_webhook(result)
      res.send(result)
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  f().then((val) => {
    res.send(val)
  })

})

app.post('/invoice/send_email', function (req, res) {

  if (is.existy(req.body.env)) {
    api_url = config.urls(req.body.env)
  }

  console.log("")
  console.log("INSTANT COLLECT API - SENDING INVOICE")
  console.log(moment().format('MMM Do YYYY, h:mm:ss a'))

  req.body.signature = signature.generateSignatureInstantCollect(req.body)

  console.log(req.body)
  var request = require('request');
  request(
    {
      url: api_url.ic_send,
      method: 'POST',
      form: req.body
    },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      // should be redirect the app.get('/redirected', ...)
      console.log(body)
      res.send(body)
    }
  );
})

app.post('/invoice/send_sms', function (req, res) {

  if (is.existy(req.body.env)) {
    api_url = config.urls(req.body.env)
  }

  console.log("")
  console.log("INSTANT COLLECT API - SENDING SMS")
  console.log(moment().format('MMM Do YYYY, h:mm:ss a'))

  req.body.signature = signature.generateSignatureInstantCollect(req.body)

  console.log(req.body)
  var request = require('request');
  request(
    {
      url: api_url.ic_send_sms,
      method: 'POST',
      form: req.body
    },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      // should be redirect the app.get('/redirected', ...)
      console.log(body)
      res.send(body)
    }
  );
})

app.post('/invoice/inquiry', function (req, res) {
  console.log("")
  console.log("INSTANT COLLECT API - INVOICE INQUIRY")
  console.log(moment().format('MMM Do YYYY, h:mm:ss a'))

  if (is.existy(req.body.env)) {
    api_url = config.urls(req.body.env)
  }

  req.body.signature = signature.generateSignatureInstantCollect(req.body)

  delete req.body['secret_key']
  console.log(req.body)

  var request = require('request');
  request(
    {
      url: api_url.ic_enquiry,
      method: 'POST',
      form: req.body
    },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      // should be redirect the app.get('/redirected', ...)

      console.log(JSON.parse(body))
      res.send(JSON.parse(body))
    }
  );
})

app.post('/invoice/void', function (req, res) {
  console.log("")
  console.log("INSTANT COLLECT API - INVOICE INQUIRY")
  console.log(moment().format('MMM Do YYYY, h:mm:ss a'))

  if (is.existy(req.body.env)) {
    api_url = config.urls(req.body.env)
  }

  req.body.signature = signature.generateSignatureInstantCollect(req.body)

  delete req.body['secret_key']
  console.log(req.body)

  var request = require('request');
  request(
    {
      url: api_url.ic_void,
      method: 'POST',
      form: req.body
    },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      // should be redirect the app.get('/redirected', ...)

      console.log(JSON.parse(body))
      res.send(JSON.parse(body))
    }
  );
}),

app.post('/invoice/refund', function (req, res) {
  console.log("")
  console.log("INSTANT COLLECT API - INVOICE REFUND")
  console.log(moment().format('MMM Do YYYY, h:mm:ss a'))

  if (is.existy(req.body.env)) {
    api_url = config.urls(req.body.env)
  }

  req.body.signature = signature.generateSignatureInstantCollect(req.body)

  delete req.body['secret_key']
  console.log(req.body)

  var request = require('request');
  request(
    {
      url: api_url.ic_refund,
      method: 'POST',
      form: req.body,
      agentOptions: {
        rejectUnauthorized: false
      }
    },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      // should be redirect the app.get('/redirected', ...)

      console.log(JSON.parse(body))
      res.send(JSON.parse(body))
    }
  );
})

app.post('/invoice_mockup', function(req, res) {
  console.log("")
  console.log("INSTANT COLLECT API - CREATE INVOICE")
  console.log(moment().format('MMM Do YYYY, h:mm:ss a'))

  var invoice = require('./modules/instantcollect')
  var api_url = 'https://test.reddotpayment.com/instanpanel/api/instancollect/save'

  if(is.existy(req.body.itemcount)) {
    req.body.details = req.items = invoice.generateRandomItem(req.body.itemcount);
  }
  
  async function f() {
    try {
      var result = await invoice.mockrequest(req, api_url);
      console.log(result)
      res.send(result)
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  f().then((val) => {
    res.send(val)
  })  
})

app.post('/invoice_notif', function(req,res) {

  var request = require('request');

  request(
    {
      url: "https://hooks.slack.com/services/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",
      method: 'POST',
      json:true,
      form: {payload: '{"text":'+JSON.stringify(JSON.stringify(req.body))+'}'}
    },
    function(err,httpResponse,body){
      console.log('test',{payload: '{"text":"'+JSON.stringify(req.body)+'"}'})
      res.send(body)
    }
  );
}),

app.post('/notif', function(req,res) {

  async function f() {
    try {
      var result = await slack.integration_webhook(req.body);
      console.log(result)
      res.send(result)
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  f().then((val) => {
    res.send(val)
  })

}),

app.post('/payment_notif', function(req,res) {
  async function f() {
    try {
      var result = await slack.webhook_notif(req.body);
      console.log(result)
      res.send(result)
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  f().then((val) => {
    res.send(val)
  })


  // gc_logger = require('./modules/gc_logger')
  // data = notif.payment_request(req.body, api_url);
  // res.send("data")

  // async function f() {
  //   try {
  //     // var result = await notif.request_payment(req.body, api_url);
  //     gc_logger.payment_response(req.body, 'notfication');
  //     res.send(result)
  //   } catch (error) {
  //     console.log(error)
  //     res.send(error);
  //   }
  // }

  // f().then((val) => {
  //   res.send(val)
  // })

}),

app.post('/bulk/partial_reversal', function(req, res){
  console.log("")
  console.log("****************** BULK CAPTURE ******************")
  console.log("********** " +moment().format('YYYY-MM-DD, HH:mm:ss.SSS')+ " **********")

  if(is.existy(req.body.endpoint)) {
    api_url = req.body.endpoint
  }
  else {
    urls = config.urls(req.body.env)
    api_url = urls.payment
  }

  bulk_capture = req.body.bulk_capture
  // console.log(bulk_capture)


  var merchantapi = require('./modules/merchantapi')

  async function parallelCall() {

    let promises = [];
    let result = [];

    _.forEach(bulk_capture, (data) =>  {
      // return Number.parseFloat(data.transaction_amount).toFixed(2)
      payload = {
        "mid"           : req.body.mid,
        "response_type" : "json", 
        "order_number"  : data.order_number,
        "transaction_id": data.transaction_id,
        "action_type"   : "auth_cancel",
        "amount"        : Number.parseFloat(data.transaction_amount * 0.35).toFixed(2),
        "currency"      : req.body.currency,
        "secret_key"    : req.body.secret_key,
      }
      console.log('Payload', payload)
      promises.push(payload)
      // promises.push(merchantapi.generatePayload(payload));
    })

    const data = await Promise.all(promises);
    _.forEach(data, (x) => {
    // console.log("data", data)
      // console.log("data",x)
      promises.push(httprequest.formPost('http://localhost:8000/merchant', x))
      // result = [data];
    })

  }

  parallelCall().then((val) => {
    console.log(val)
    res.send('Processing ...')
  })

})

app.post('/bulk/capture', function(req, res){
  console.log("")
  console.log("****************** BULK CAPTURE ******************")
  console.log("********** " +moment().format('YYYY-MM-DD, HH:mm:ss.SSS')+ " **********")

  if(is.existy(req.body.endpoint)) {
    api_url = req.body.endpoint
  }
  else {
    urls = config.urls(req.body.env)
    api_url = urls.payment
  }

  bulk_capture = req.body.bulk_capture
  // console.log(bulk_capture)


  var merchantapi = require('./modules/merchantapi')

  async function parallelCall() {

    let promises = [];
    let result = [];

    _.forEach(bulk_capture, (data) =>  {
      payload = {
        "mid": req.body.mid,
        "response_type":"json", 
        "order_number":data.order_number,
        "transaction_id":data.transaction_id,
        "action_type":"capture",
        "amount": Number.parseFloat(data.transaction_amount * 0.65).toFixed(2),
        "currency":req.body.currency,
        "secret_key":req.body.secret_key,
      }
      console.log('Payload', payload)
      promises.push(payload)
      // promises.push(merchantapi.generatePayload(payload));
    })

    const data = await Promise.all(promises);
    data.forEach(({ merchantcallMerchantAPI }) => {
      result = [...result, data];
    });
    // _.forEach(data, (x) => {
    // // console.log("data", data)
    //   // console.log("data",x)
    //   promises.push(httprequest.formPost('http://localhost:8000/merchant', x))
    //   // result = [data];
    // })

  }

  parallelCall().then((val) => {
    console.log(val)
    res.send('Processing ...')
  })

})

app.post('/bulk/refund', function(req, res){
  console.log("")
  console.log("****************** BULK REFUND ******************")
  console.log("********** " +moment().format('YYYY-MM-DD, HH:mm:ss.SSS')+ " **********")

  if(is.existy(req.body.endpoint)) {
    api_url = req.body.endpoint
  }
  else {
    urls = config.urls(req.body.env)
    api_url = urls.payment
  }

  bulk_capture = req.body.bulk_capture
  // console.log(bulk_capture)


  var merchantapi = require('./modules/merchantapi')

  async function parallelCall() {

    let promises = [];
    let result = [];

    _.forEach(bulk_capture, (data) =>  {
      payload = {
        "mid": req.body.mid,
        "response_type":"json", 
        "order_number":data.order_number,
        "transaction_id":data.transaction_id,
        "action_type":"refund",
        "amount": data.transaction_amount,
        "currency":req.body.currency,
        "secret_key":req.body.secret_key,
      }
      console.log('Payload', payload)
      promises.push(payload)
      // promises.push(merchantapi.generatePayload(payload));
    })

    const data = await Promise.all(promises);
    _.forEach(data, (x) => {
    // console.log("data", data)
      // console.log("data",x)
      promises.push(httprequest.formPost('http://localhost:8000/merchant', x))
      // result = [data];
    })

  }

  parallelCall().then((val) => {
    console.log(val)
    res.send('Processing ...')
  })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
