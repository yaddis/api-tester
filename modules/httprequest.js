var request = require('request');
var querystring = require('querystring');
const is = require('is_js')
const _          = require('underscore')

module.exports = {

  generic: function(res, url, data) {
    request({
      url: api_url.ic_save,
      method: 'POST',
      form: data
    },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      return body
    });
  },

  json: function (data, api_url) {

    // request()

    console.log(data)
    return new Promise((resolve, reject) => {
      console.log('ded',api_url)
      request(api_url , {
          method: 'POST',
          json: data
        },
        function RequestCallback(err, httpResponse, body) {
          if (err) {
            console.error(err)
            reject(err)
          }
          resolve(body)
        }
      );
    })


  },

  formPost: function (api_url, data) {
    request({
      url: api_url,
      method: 'POST',
      form: data,

    },
    function optionalCallback(err, httpResponse, body) {
      // console.log(postData)
      console.log(body)
      if (err) {
        console.log(err)
        return console.error('upload failed:', err);
      }
      return body
    });
  },
}
