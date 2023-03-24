let sha512 = require('js-sha512')
let md5    = require('md5')
let _      = require('underscore')
let is     = require('is_js')
let helper = require('./helper');
let base64 = require('base-64');
let utf8   = require('utf8');
module.exports = {
  flatString: function sorting(data) {
    sorted_data  = helper.ksort(data)

    presignature = _.map(sorted_data, function(val, key) {
      // console.log(val + " is: " + typeof val)
      if(is.object(val) && is.not.undefined(key)) {
        return sorting(val)
      } else {
        return val;
      }
    }).join("")

    return presignature;
  },

  generateSignatureInstantCollect: function(param) {
    secret_key = param.secret_key
    delete param['secret_key']
    delete param['env']
    presignature = this.flatString(param) + secret_key
    console.log(presignature)
    hash = sha512(presignature)
    return hash
  },

  generateSignature: function(data) {
    sorted_data  = helper.ksort(data)

    console.log('presignature calculation',data)
    delete sorted_data['secret_key'];

    presignature = _.map(sorted_data, function(val, key) {
      return val;
    }).join("")

    presignature = presignature+data.secret_key;

    console.log("presignature", presignature)
    hash = sha512(presignature)
    return hash
  },

  paymentSignature: function(data) {

    var pre_signature = data.mid.trim() + data.order_id.trim() + data.payment_type + data.amount + data.ccy;

    var cvv_1 = ""
    if (is.existy(data.payer_id)) {
      pre_signature += data.payer_id
    }

    if (data.api_mode == 'redirection_sop' || data.api_mode == 'direct_n3d' || data.api_mode == 'direct_3d' ) {
      if (is.existy(data.cvv2)) {
        cvv_1 = data.cvv2.slice(-1)
      }

      if (is.existy(data.payer_id)) {
        pre_signature += cvv_1
      } else {
        pre_signature += data.card_no.slice(0, 6) + data.card_no.slice(-4) + data.exp_date + cvv_1
      }
    }

    pre_signature += data.secret_key
    console.log('pre_signature', pre_signature)
    var signature = sha512(pre_signature)

    return signature;
  },

  md5Signature: function(data) {
    sorted_data  = helper.ksort(data)
    delete sorted_data['secret_key'];

    presignature = _.map(sorted_data, function(val, key) {
      return key+'='+val;
    }).join("&")
    presignature = presignature+"&secret_key="+data.secret_key;
    console.log(presignature);
    return md5(presignature) ;
  },

  base64Auth: function(data) {
    var bytes = utf8.encode(data);
    var encoded = base64.encode(bytes);
    console.log(encoded);
    return encoded;
  },

  signGeneric: function (secret_key, param) {
    delete param['secret_key']

    var pre_signature = this.recursiveGenericArraySign(param)
    hash = sha512(pre_signature+secret_key)
    return hash
  },

  recursiveGenericArraySign: function recursive(param) {
    sorted_data = helper.ksort(param)

    return presignature = _.map(sorted_data, function(val, key) {
      if(is.json(val)) {
        return recursive(val)
      } else {
        return val;
      }
    }).join("")
  },

  isValidSignature: function(data, secret_key) {
    // delete(data['signature'])
    signature = this.signGeneric(secret_key, data);
    return signature;
  }
};
