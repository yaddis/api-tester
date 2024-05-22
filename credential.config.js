const is = require("is_js")
const _ = require('underscore')

module.exports = {
  get: function(index = 'default') {

    index = 'default'
    var credential = {
      "default": {
        "mid": "",
        "secret_key": "",
        "ccy": "",
        "env": "",
        "amount": 1
      },
    }

    return credential[index]
  },

  urls: function(env = 'test') {
    var urls = {
      "live": {
        "payment": "https://secure.reddotpayment.com/service/payment-api",
        "payment_redirect": "https://secure.reddotpayment.com/service/Merchant_processor/query_redirection",
        "token": "https://secure.reddotpayment.com/service/token-api",
        "token_redirect": "https://secure.reddotpayment.com/service/Merchant_processor/query_token_redirection",
        "ic_save": "https://connect.reddotpayment.com/instanpanel/api/instancollect/save",
        "ic_send": "https://connect.reddotpayment.com/instanpanel/api/instancollect/send",
        "ic_send_sms": "https://connect.reddotpayment.com/instanpanel/api/instancollect/send_sms",
        "ic_enquiry": "https://connect.reddotpayment.com/instanpanel/api/instancollect/enquiry",
        "merchant_api": "https://connect.reddotpayment.com/instanpanel/api/payment",
        "check_status_api": "https://connect.reddotpayment.com/instanpanel/api/enquiry",
      },
      "test": {
        "payment": "https://secure-dev.reddotpayment.com/service/payment-api",
        "payment_redirect": "https://secure-dev.reddotpayment.com/service/Merchant_processor/query_redirection",
        "token": "https://secure-dev.reddotpayment.com/service/token-api",
        "token_redirect": "https://secure-dev.reddotpayment.com/service/Merchant_processor/query_token_redirection",
        "ic_save": "https://test.reddotpayment.com/instanpanel/api/instancollect/save",
        "ic_send": "https://test.reddotpayment.com/instanpanel/api/instancollect/send",
        "ic_send_sms": "https://test.reddotpayment.com/instanpanel/api/instancollect/send_sms",
        "ic_enquiry": "https://test.reddotpayment.com/instanpanel/api/instancollect/enquiry",
        "ic_void": "https://test.reddotpayment.com/instanpanel/api/instancollect/void",
        "ic_refund": "https://test.reddotpayment.com/instanpanel/api/instancollect/refund",
        "merchant_api": "https://test.reddotpayment.com/instanpanel/api/payment",
        "check_status_api": "https://test.reddotpayment.com/instanpanel/api/enquiry",
      },
      "staging": {
        "payment": "https://service2-dev.reddotpayment.com/service/payment-api",
        "payment_redirect": "https://service2-dev.reddotpayment.com/service/Merchant_processor/query_redirection",
        "token": "https://service2-dev.reddotpayment.com/service/token-api",
        "token_redirect": "https://service2-dev.reddotpayment.com/service/Merchant_processor/query_token_redirection",
        "ic_save": "https://test.reddotpayment.com/instanpanel/api/instancollect/save",
        "ic_send": "https://test.reddotpayment.com/instanpanel/api/instancollect/send",
        "ic_send_sms": "https://test.reddotpayment.com/instanpanel/api/instancollect/send_sms",
        "ic_enquiry": "https://test.reddotpayment.com/instanpanel/api/instancollect/enquiry",
        "merchant_api": "https://test.reddotpayment.com/instanpanel/api/payment"
      },
      "nanda": {
        "payment": "https://secure-dev.reddotpayment.com/service-nanda/payment-api",
        "payment_redirect": "https://secure-dev.reddotpayment.com/service-nanda/Merchant_processor/query_redirection",
        "token": "https://secure-dev.reddotpayment.com/service-nanda/token-api",
        "token_redirect": "https://secure-dev.reddotpayment.com/service-nanda/Merchant_processor/query_token_redirection",
        "ic_save": "https://test.reddotpayment.com/instanpanel-nanda/api/instancollect/save",
        "ic_send": "https://test.reddotpayment.com/instanpanel-nanda/api/instancollect/send",
        "ic_send_sms": "https://test.reddotpayment.com/instanpanel-nanda/api/instancollect/send_sms",
        "ic_enquiry": "https://test.reddotpayment.com/instanpanel-nanda/api/instancollect/enquiry",
        "merchant_api": "https://test.reddotpayment.com/instanpanel-nanda/api/payment",
        "check_status_api": "https://test.reddotpayment.com/instanpanel-nanda/api/enquiry"
      },
      "yoas": {
        "payment": "https://secure-dev.reddotpayment.com/service-yoas/payment-api",
        "payment_redirect": "https://secure-dev.reddotpayment.com/service-yoas/Merchant_processor/query_redirection",
        "token": "https://secure-dev.reddotpayment.com/service-yoas/token-api",
        "token_redirect": "https://secure-dev.reddotpayment.com/service-yoas/Merchant_processor/query_token_redirection",
        "ic_save": "https://test.reddotpayment.com/instanpanel/api/instancollect/save",
        "ic_send": "https://test.reddotpayment.com/instanpanel/api/instancollect/send",
        "ic_send_sms": "https://test.reddotpayment.com/instanpanel/api/instancollect/send_sms",
        "ic_enquiry": "https://test.reddotpayment.com/instanpanel/api/instancollect/enquiry",
        "check_status_api": "https://test.reddotpayment.com/instanpanel/api/enquiry",
        "merchant_api": "https://test.reddotpayment.com/instanpanel/api/payment"
      },
      "edo": {
        "payment": "https://secure-dev.reddotpayment.com/service-ea/payment-api",
        "payment_redirect": "https://secure-dev.reddotpayment.com/service-ea/Merchant_processor/query_redirection",
        "token": "https://secure-dev.reddotpayment.com/service-ea/token-api",
        "token_redirect": "https://secure-dev.reddotpayment.com/service-ea/Merchant_processor/query_token_redirection",
        "ic_save": "https://44.225.25.223/instanpanel-ea/api/instancollect/save",
        "ic_send": "https://44.225.25.223/instanpanel-ea/api/instancollect/send",
        "ic_send_sms": "https://44.225.25.223/instanpanel-ea/api/instancollect/send_sms",
        "ic_enquiry": "https://44.225.25.223/instanpanel-ea/api/instancollect/enquiry",
        "check_status_api": "https://test.reddotpayment.com/instanpanel/api/enquiry",
        "merchant_api": "https://44.225.25.223/instanpanel-ea/api/payment"
      },
      "nico": {
        "payment": "https://secure-dev.reddotpayment.com/service-nico/payment-api",
        "payment_redirect": "https://secure-dev.reddotpayment.com/service-nico/Merchant_processor/query_redirection",
        "token": "https://secure-dev.reddotpayment.com/service-nico/token-api",
        "token_redirect": "https://secure-dev.reddotpayment.com/service-nico/Merchant_processor/query_token_redirection",
        "ic_save": "https://44.225.25.223/instanpanel-nico/api/instancollect/save",
        "ic_send": "https://44.225.25.223/instanpanel-nico/api/instancollect/send",
        "ic_send_sms": "https://44.225.25.223/instanpanel-nico/api/instancollect/send_sms",
        "ic_enquiry": "https://44.225.25.223/instanpanel-nico/api/instancollect/enquiry",
        "ic_refund": "https://44.225.25.223/instanpanel-nico/api/instancollect/refund",
        "check_status_api": "https://test.reddotpayment.com/instanpanel/api/enquiry",
        "merchant_api": "https://44.225.25.223/instanpanel-nico/api/payment"
      },
      "test2": {
        "payment": "https://secure-dev.reddotpayment.com/service-test/payment-api",
        "payment_redirect": "https://secure-dev.reddotpayment.com/service-test/Merchant_processor/query_redirection",
        "token": "https://secure-dev.reddotpayment.com/service-test/token-api",
        "token_redirect": "https://secure-dev.reddotpayment.com/service-test/Merchant_processor/query_token_redirection",
        "ic_save": "https://test.reddotpayment.com/instanpanel_dev/test/api/instancollect/save",
        "ic_send": "https://test.reddotpayment.com/instanpanel_dev/test/api/instancollect/send",
        "ic_send_sms": "https://test.reddotpayment.com/instanpanel_dev/test/api/instancollect/send_sms",
        "ic_enquiry": "https://test.reddotpayment.com/instanpanel_dev/test/api/instancollect/enquiry",
        "merchant_api": "https://18.237.1.116/instapanel_dev/api/payment"
      },
      "kamal": {
        "payment": "https://secure-dev.reddotpayment.com/service-kamal/payment-api",
        "payment_redirect": "https://secure-dev.reddotpayment.com/service-kamal/Merchant_processor/query_redirection",
        "token": "https://secure-dev.reddotpayment.com/service-kamal/token-api",
        "token_redirect": "https://secure-dev.reddotpayment.com/service-kamal/Merchant_processor/query_token_redirection",
        "ic_save": "https://44.225.25.223/instanpanel-kamal/test/api/instancollect/save",
        "ic_send": "https://44.225.25.223/instanpanel-kamal/test/api/instancollect/send",
        "ic_send_sms": "https://44.225.25.223/instanpanel-kamal/test/api/instancollect/send_sms",
        "ic_enquiry": "https://44.225.25.223/instanpanel-kamal/test/api/instancollect/enquiry",
        "merchant_api": "https://test.reddotpayment.com/instanpanel-k/api/payment"
      },
      "andar": {
        "payment": "https://secure-dev.reddotpayment.com/service-andar/payment-api",
        "payment_redirect": "https://secure-dev.reddotpayment.com/service-andar/Merchant_processor/query_redirection",
        "token": "https://secure-dev.reddotpayment.com/service-andar/token-api",
        "token_redirect": "https://secure-dev.reddotpayment.com/service-andar/Merchant_processor/query_token_redirection",
        "ic_save": "https://44.225.25.223/instanpanel-andar/test/api/instancollect/save",
        "ic_send": "https://44.225.25.223/instanpanel-andar/test/api/instancollect/send",
        "ic_send_sms": "https://44.225.25.223/instanpanel-andar/test/api/instancollect/send_sms",
        "ic_enquiry": "https://44.225.25.223/instanpanel-andar/test/api/instancollect/enquiry",
        "merchant_api": "https://44.225.25.223/instanpanel-andar/api/payment",
        // "merchant_api": "https://44.225.25.223/instanpanel-ea2/api/enquiry/"
        "check_status_api": "https://44.225.25.223/instanpanel-ea2/api/enquiry/"
      }
    }

    return urls[env]
  },

  card: function(index = '4111') {
    var cards = {
      "4111":{"card_no":"4111111111111111","cvv":"123","exp_month":"11","exp_year":"2023","card_type":"Visa"},
      "master":{"card_no":"5200000900007102", "cvv":"123", "exp_month":"11", "exp_year":"2023", "card_type":"Master"},
      "amex":{"card_no":"341111599241000", "cvv":"9395", "exp_month":"9", "exp_year":"2023", "card_type":"Amex Direct"},
      "bml_visa":{"card_no":"4073884292535623", "cvv":"796", "exp_month":"01", "exp_year":"2021", "card_type":"Visa"},
      "bml_amex":{"card_no":"377668525712658", "cvv":"666" ,"exp_month":"01", "exp_year":"2021", "card_type":"Amex"},
      "bml_master":{"card_no":"5264310136894790", "cvv":"598", "exp_month":"1", "exp_year":"2023", "card_type":"Master"},
      "mbb_v1":{"card_no":"4012001038443335", "cvv":"123", "exp_month":"11", "exp_year":"2020", "card_type":"Visa, Accept"},
      "mbb_v2":{"card_no":"4137180309145918", "cvv":"123", "exp_month":"11", "exp_year":"2020", "card_type":"Visa, Accept"},
      "mbb_v3":{"card_no":"4842810230406585", "cvv":"123", "exp_month":"11", "exp_year":"2020", "card_type":"Visa, Accept"},
      "mbb_v4":{"card_no":"4532081864698195", "cvv":"123", "exp_month":"11", "exp_year":"2020", "card_type":"Visa, Declined"},
      "mbb_v5":{"card_no":"4556627170972558", "cvv":"123", "exp_month":"11", "exp_year":"2020", "card_type":"Visa, Declined"},
      "mbb_v6":{"card_no":"4024007157615559", "cvv":"123", "exp_month":"11", "exp_year":"2020", "card_type":"Visa, Declined"},
      "mbb_m1":{"card_no":"5123456789012346", "cvv":"123", "exp_month":"11", "exp_year":"2020", "card_type":"Master, Accept"},
      "mbb_m2":{"card_no":"5200000900007102", "cvv":"123", "exp_month":"11", "exp_year":"2020", "card_type":"Master, Accept"},
      "mbb_m3":{"card_no":"5426340900064101", "cvv":"123", "exp_month":"11", "exp_year":"2020", "card_type":"Master, Accept"},
      "mbb_m4":{"card_no":"5421240038888824", "cvv":"123", "exp_month":"11", "exp_year":"2020", "card_type":"Master, Accept"},
      "mbb_m5":{"card_no":"5460179861854077", "cvv":"123", "exp_month":"11", "exp_year":"2020", "card_type":"Master, Declined"},
      "mbb_m6":{"card_no":"5249021852119987", "cvv":"123", "exp_month":"11", "exp_year":"2020", "card_type":"Master, Declined"},
      "mbb_m7":{"card_no":"5254018166068894", "cvv":"123", "exp_month":"11", "exp_year":"2020", "card_type":"Master, Declined"},
      "mbb_a1":{"card_no":"379185020115871", "cvv":"1234", "exp_month":"11", "exp_year":"2020", "card_type":"Amex, Accept"},
      "mbb_a2":{"card_no":"379185025689508", "cvv":"1234", "exp_month":"11", "exp_year":"2020", "card_type":"Amex, Accept"},
      "mbb_a3":{"card_no":"379186030154488", "cvv":"1234", "exp_month":"11", "exp_year":"2020", "card_type":"Amex, Accept"},
      "mbb_a4":{"card_no":"379186031000003", "cvv":"1234", "exp_month":"11", "exp_year":"2020", "card_type":"Amex, Accept"},
      "mbb_a5":{"card_no":"376083833970769", "cvv":"1234", "exp_month":"11", "exp_year":"2020", "card_type":"Amex, Declined"},
      "hitrust_visa_1":{"card_no":"379186031000003", "cvv":"123", "exp_month":"10", "exp_year":"2028", "card_type":""},
      "hitrust_visa_2":{"card_no":"379186031000003", "cvv":"123", "exp_month":"10", "exp_year":"2028", "card_type":""},
      "hitrust_mc_1":{"card_no":"379186031000003", "cvv":"123", "exp_month":"10", "exp_year":"2028", "card_type":""},
      "hitrust_mc_2":{"card_no":"379186031000003", "cvv":"123", "exp_month":"10", "exp_year":"2028", "card_type":""},
      "tgs_visa_1":{"card_no":"379186031000003", "cvv":"123", "exp_month":"10", "exp_year":"2028", "card_type":""},
      "tgs_mc_1":{"card_no":"379186031000003", "cvv":"123", "exp_month":"10", "exp_year":"2028", "card_type":""}
    }

    return cards[index]
  },

  scheme: function() {
    var data = {
      "instancollect": {
        "create": {
          "mid":"",
          "secret_key":"",
          "invoice_number":"",
          "subject":"",
          "customer_name":"",
          "customer_email":"",
          "discount":"",
          "gst":"",
          "currency":"",
          "created_date":"",
          "details": [
            {
              "description":"",
              "quantity":"",
              "unit_price":""
            }
          ],
          "expiry_datetime":"",
          "send_reminder_after":"",
          "reminder_resend":"",
          "notify_url":""
        }
      }
    }
  },

  getConversionRate: function(trx_currency, mcp_currency) {
    rate = {
      "SGD": {
        "CHF":{"CurrencyCode":"756","Value":1.3729706},
        "EUR":{"CurrencyCode":"978","Value":1.3574274},
        "HKD":{"CurrencyCode":"344","Value":0.1618154},
        "JPY":{"CurrencyCode":"392","Value":0.0096558},
        "KWD":{"CurrencyCode":"414","Value":4.1485235},
        "USD":{"CurrencyCode":"840","Value":1.2702779}
      },
      "USD": {
        "CHF": {"CurrencyCode":"756", "Value":1.0372684},
        "EUR": {"CurrencyCode":"978", "Value":1.0392966},
        "HKD": {"CurrencyCode":"344", "Value":0.1225367},
        "JPY": {"CurrencyCode":"392", "Value":0.0073461},
        "KWD": {"CurrencyCode":"414", "Value":3.1476624},
        "SGD": {"CurrencyCode":"702", "Value":0.7274303}
      },
      "EUR": {
        "CHF": {"CurrencyCode":"756", "Value":0.9481162},
        "HKD": {"CurrencyCode":"344", "Value":0.1120048},
        "JPY": {"CurrencyCode":"392", "Value":0.0067147},
        "KWD": {"CurrencyCode":"414", "Value":2.8771240},
        "SGD": {"CurrencyCode":"702", "Value":0.6649084},
        "USD": {"CurrencyCode":"840", "Value":0.8788952}
      },
      "JPY": {
        "CHF": {"CurrencyCode":"756", "Value":133.4130951},
        "EUR": {"CurrencyCode":"978", "Value":133.6739617},
        "HKD": {"CurrencyCode":"344", "Value":15.7606222},
        "KWD": {"CurrencyCode":"414", "Value":404.8511401},
        "SGD": {"CurrencyCode":"702", "Value":95.1315247},
        "USD": {"CurrencyCode":"840", "Value":123.6727368}
      }
    }

    return rate[trx_currency][mcp_currency]
  }
}
