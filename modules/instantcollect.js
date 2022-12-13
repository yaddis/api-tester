const signature = require('../signature');
const helper = require('../helper');
const moment = require('moment')
const request = require('request');
const reqprom = require('request-promise');
const sha512 = require('js-sha512')
const is = require('is_js')
const _ = require('underscore')
const config = require('../credential.config');

module.exports = {

  create: function(req, api_url) {
    data = req.body

    data.mid = req.body.mid
    data.secret_key = req.body.secret_key

    data.created_date = moment().format('YYYY-MM-DD HH:mm:ss')
    data.invoice_number = helper.randomString()
    // data.expiry_datetime = moment().add(3, 'hours').format('YYYY-MM-DD HH:mm:ss')
    data.subject = 'Invoice_' + data.invoice_number
    delete data['env']
    delete data['itemcount']
    data.signature = signature.generateSignatureInstantCollect(data)

    delete data['secret_key']
    console.log(helper.ksort(data))
    console.log("API URL", api_url.ic_save)

    request_option = {
      url: api_url.ic_save,
      method: 'POST',
      form: data,
      agentOptions: {
        rejectUnauthorized: false
      }
    }

    // return data;
    
    return new Promise((resolve, reject) => {
      reqprom(request_option)
        .then((api_response) => {
          resolve({'request':data,'response':JSON.parse(api_response)})
        })
        .catch((error) => {
          reject({'request':data,'response':error})
        })
    })

  },

  inquiry: function (req, api_url) {
    data = req.body

    data.mid = req.body.mid
    data.secret_key = req.body.secret_key
    data.signature = signature.generateSignatureInstantCollect(req.body)

    delete data['env']
    delete data['secret_key']
    console.log(data)

    request_option = {
      url: api_url.ic_save,
      method: 'POST',
      form: data,
      agentOptions: {
        rejectUnauthorized: false
      }
    }

    return new Promise((resolve, reject) => {
      reqprom(request_option)
        .then((api_response) => {
          resolve(api_response)
        })
        .catch((error) => {
          reject(error)
        })
    })

  },

  sendemail: function (req, api_url) {
    data = req.body

    data.mid = req.body.mid
    data.secret_key = req.body.secret_key
    data.signature = signature.generateSignatureInstantCollect(req.body)

    delete data['env']
    delete data['secret_key']
    console.log(data)

    request_option = {
      url: api_url.ic_save,
      method: 'POST',
      form: data
    }

    return new Promise((resolve, reject) => {
      reqprom(request_option)
        .then((api_response) => {
          resolve(api_response)
        })
        .catch((error) => {
          reject(error)
        })
    })

  },

  sendsms: function (req, api_url) {
    data = req.body

    data.mid = req.body.mid
    data.secret_key = req.body.secret_key
    data.signature = signature.generateSignatureInstantCollect(req.body)

    delete data['env']
    delete data['secret_key']
    console.log(data)

    request_option = {
      url: api_url.ic_save,
      method: 'POST',
      form: data
    }

    return new Promise((resolve, reject) => {
      reqprom(request_option)
        .then((api_response) => {
          resolve(api_response)
        })
        .catch((error) => {
          reject(error)
        })
    })

  },

  mockrequest: function(req, api_url) {
    data = req.body

    data.created_date = moment().format('YYYY-MM-DD HH:mm:ss')
    data.invoice_number = helper.randomString()
    // data.expiry_datetime = moment().add(3, 'hours').format('YYYY-MM-DD HH:mm:ss')
    data.subject = 'Invoice_' + data.invoice_number
    data.signature = signature.generateSignatureInstantCollect(data)
    // data.signature = signature.generateSignatureInstantCollect(data)

    delete data['itemcount']
    delete data['secret_key']

    console.log(data)
    return data
    // request_option = {
    //   url: api_url,
    //   method: 'POST',
    //   form: data
    // }

    // return new Promise((resolve, reject) => {
    //   reqprom(request_option)
    //     .then((api_response) => {
    //       resolve(api_response)
    //     })
    //     .catch((error) => {
    //       reject(error)
    //     })
    // })
    
  },

  generateRandomItem: function(count) {
    var element = []
    for (let item = 0; item < count; item++) {
       element.push( this.randomItem(item) )
    }
    return element
  },

  randomItem: function (i) {
    itemcount = i+1
    return {
      "description": "Item "+itemcount,
      "quantity": helper.getRandomInt(1,5),
      "unit_price": helper.randomNumber("SGD")
    }
    
  }
}
