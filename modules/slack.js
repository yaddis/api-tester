const reqprom = require('request-promise');
const is      = require('is_js')


var slack_var = {
  "app_id":"A027X5KLGJ0",
  "client_id":"457701094148.2269189696612",
  "client_secret": "81a7f3efd80471ec837aa887c6ea81ca",
  "signing_secret": "69d094a1143ba6249fe87080ea62ba08",
  "verification_token":"d599b9Q3uTQU6ty7SDT3Vv54",
  "webhook":"https://hooks.slack.com/services/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"
}

module.exports = {
  webhook_paymenturl: function(api_response) {
    var payment_request = api_response["request"];
    var payment_response = api_response["response"];
  
    if(is.existy(payment_response["payment_url"])) {
      // console.log(payment_response)
      var message = {
        "blocks": [
          {
            "type": "header",
            "text": {
              "type": "plain_text",
              "text": "API Request "+payment_request["order_id"],
              "emoji": true
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "```"+JSON.stringify(payment_request)+"```"
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "header",
            "text": {
              "type": "plain_text",
              "text": "Payment URL "+payment_request["order_id"],
              "emoji": true
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "```"+JSON.stringify(payment_response)+"```"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "`"+payment_response['payment_url']+"`"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Open Payment URL*"
            },
            "accessory": {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Open",
                "emoji": true
              },
              "style": "primary",
              "value": "click_me_123",
              "url": payment_response['payment_url'],
              "action_id": "button-action"
            }
          }
        ]
      }
  
    } else {
      if(payment_response["response_code"] == '0') {
        var icon = "https://cdn-icons-png.flaticon.com/512/391/391175.png"
      } else {
        var icon = "https://cdn-icons-png.flaticon.com/512/391/391116.png"
      }
      var message = {"blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "API Request "+payment_request["order_id"],
            "emoji": true
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "plain_text",
            "text": JSON.stringify(payment_request),
            "emoji": true
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "Payment Response "+payment_request["order_id"],
            "emoji": true
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": JSON.stringify(payment_response)
        },
          "accessory": {
            "type": "image",
            "image_url": icon,
            "alt_text": "cute cat"
          }
        }
      ]
      };
    }
  
    request_option  = {
      url: slack_var.webhook,      
      method: 'POST',
      json: message
    }
  
    return new Promise((resolve, reject) => {
      reqprom(request_option)
      .then(()=>{
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
    })
  },

  webhook_notif: function(api_response) {

    if(api_response["response_code"] == '0') {
      var icon = "https://cdn-icons-png.flaticon.com/512/391/391175.png"
    } else {
      var icon = "https://cdn-icons-png.flaticon.com/512/391/391116.png"
    }
    var message = {
      "blocks": [
        {
          "type": "header",
          "text": {
          "type": "plain_text",
          "text": "Notification Response "+api_response["order_id"],
          "emoji": true
          }
        },
        {
          "type": "section",
          "text": {
          "type": "mrkdwn",
          "text": "```"+JSON.stringify(api_response, "\n", "\t")+"```"
        },
          "accessory": {
          "type": "image",
          "image_url": icon,
          "alt_text": "cute cat"
          }
        }
      ]
    };
    request_option  = {
      url: slack_var.webhook,
      method: 'POST',
      json: message
    }

    return new Promise((resolve, reject) => {
      reqprom(request_option)
      .then(()=>{
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
    })

  },

  integration_webhook: function(params) {

    request_option  = {
      url: slack_var.webhook,
      method: 'POST',
      form: {payload: '{"text":'+JSON.stringify(JSON.stringify(params), "\n", "\t")+'}'}
    }
  
    return new Promise((resolve, reject) => {
      reqprom(request_option)
      .then(()=>{
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
    })

    // request(
    //   {
    //     url: "https://hooks.slack.com/services/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",
    //     method: 'POST',
    //     json:true,
    //     form: {payload: '{"text":'+JSON.stringify(JSON.stringify(params))+'}'}
    //   },
    //   function(err,httpResponse,body){
    //     console.log('test',{payload: '{"text":"'+JSON.stringify(JSON.stringify(params))+'"}'})
    //   }
    // );
  }
}