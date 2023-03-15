const signature   = require('../signature');
const helper      = require('../helper');

module.exports = {

  generatePayload: function(data) {
    let sign = signature.md5Signature(data)

    // console.log("signature",sign)
    data["signature"] = sign
    delete data['secret_key']

    return data
  },
  capture: function(data) {
    console.log (data)
  }


}