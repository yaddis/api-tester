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
        "merchant_api": "https://connect.reddotpayment.com/instanpanel/api/payment"
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
        "merchant_api": "https://test.reddotpayment.com/instanpanel/api/payment"
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
        "payment_redirect": "https://secure-dev.reddotpayment.com/service/Merchant_processor/query_redirection",
        "token": "https://secure-dev.reddotpayment.com/service-nanda/token-api",
        "token_redirect": "https://secure-dev.reddotpayment.com/service-nanda/Merchant_processor/query_token_redirection",
        "ic_save": "https://44.225.25.223/instanpanel-nanda/api/instancollect/save",
        "ic_send": "https://44.225.25.223/instanpanel-nanda/api/instancollect/send",
        "ic_send_sms": "https://44.225.25.223/instanpanel-nanda/api/instancollect/send_sms",
        "ic_enquiry": "https://44.225.25.223/instanpanel-nanda/api/instancollect/enquiry",
        "merchant_api": "https://44.225.25.223/instanpanel-nanda/api/payment"
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
        "merchant_api": "https://44.225.25.223/instapanel-kamal/api/payment"
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
        "merchant_api": "https://44.225.25.223/instanpanel-andar/api/payment"
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


  getMid: function(mid) {
    mids = {
        "1007780734": {
          "mid": "1007780734",
          "secret_key":"reddotpayment_2023",
          "currency": "SGD"
        },
        "1007780770": {
          "mid": "1007780770",
          "secret_key":"reddotpayment_2023",
          "currency": "USD"
        },
        "1007780823": {
          "mid": "1007780823",
          "secret_key": "reddotpayment_2023",
          "currency": "EUR"
        },
        "1007780824": {
          "mid": "1007780824",
          "secret_key": "reddotpayment_2023",
          "currency": "JPY"
      }
    }
    if(is.existy(mid)){
      return mids[mid]
    } else {
      return mids
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
  },

  getTestCase: function(index) {
    const test_cases = {
      1: {"case_number":"01", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871","trx_amount":110, "trx_currency":"SGD", "trx_type":"S", "card_brand":"VISA"},
      2: {"case_number":"02", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"4123709999000029", "exp_date":"122031", "cvv":"855","trx_amount":120, "trx_currency":"SGD", "trx_type":"S", "card_brand":"VISA"},
      3: {"case_number":"03", "api_mode":"direct_n3d", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"4761369999000078", "exp_date":"122031", "cvv":"964","trx_amount":130, "trx_currency":"SGD", "trx_type":"S", "card_brand":"VISA"},
      4: {"case_number":"04", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871","trx_amount":140, "trx_currency":"SGD", "trx_type":"A", "card_brand":"VISA"},
      // 5: {"case_number":"05", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871","trx_amount":140, "trx_currency":"SGD", "trx_type":"Authorisation_Completion", "card_brand":"VISA"},
      6: {"case_number":"06", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871","trx_amount":170, "trx_currency":"SGD", "trx_type":"S", "card_brand":"VISA"},
      // 7: {"case_number":"07", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871","trx_amount":170, "trx_currency":"SGD", "trx_type":"Void", "card_brand":"VISA"},
      8: {"case_number":"08", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"4025249999000090", "exp_date":"122031", "cvv":"621","trx_amount":190, "trx_currency":"SGD", "trx_type":"A", "card_brand":"VISA"},
      // 9: {"case_number":"09", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"4025249999000090", "exp_date":"122031", "cvv":"621","trx_amount":190, "trx_currency":"SGD", "trx_type":"Full_Reversal", "card_brand":"VISA"},
      10: {"case_number":"10", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"4515459999000084", "exp_date":"122031", "cvv":"217","trx_amount":210, "trx_currency":"SGD", "trx_type":"A", "card_brand":"VISA"},
      // 11: {"case_number":"11", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"4515459999000084", "exp_date":"122031", "cvv":"217","trx_amount":200, "trx_currency":"SGD", "trx_type":"Partial_Reveral", "card_brand":"VISA"},
      12: {"case_number":"12", "api_mode":"redirection_sop", "sub_trx_type":"Domestic", "mid":"1007780734", "card_number":"4761349999000039", "exp_date":"122031", "cvv":"998","trx_amount":300, "trx_currency":"SGD", "trx_type":"S", "card_brand":"VISA"},
      13: {"case_number":"13", "api_mode":"redirection_sop", "sub_trx_type":"Domestic", "mid":"1007780734", "card_number":"4761349999000039", "exp_date":"122031", "cvv":"998","trx_amount":300, "trx_currency":"SGD", "trx_type":"S", "card_brand":"VISA"},
      14: {"case_number":"14", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780770", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871","trx_amount":50, "trx_currency":"USD", "trx_type":"S", "card_brand":"VISA"},
      15: {"case_number":"15", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780823", "card_number":"4515459999000084", "exp_date":"122031", "cvv":"217","trx_amount":70, "trx_currency":"EUR", "trx_type":"S", "card_brand":"VISA"},
      16: {"case_number":"16", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780824", "card_number":"4025249999000090", "exp_date":"122031", "cvv":"621","trx_amount":20000, "trx_currency":"JPY", "trx_type":"S", "card_brand":"VISA"},
      17: {"case_number":"17", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"2223000890000018", "exp_date":"122025", "cvv":"100","trx_amount":210, "trx_currency":"SGD", "trx_type":"S", "card_brand":"Mastercard"},
      18: {"case_number":"18", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"5204740000001002", "exp_date":"122025", "cvv":"100","trx_amount":220, "trx_currency":"SGD", "trx_type":"S", "card_brand":"Mastercard"},
      19: {"case_number":"19", "api_mode":"direct_n3d", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"5204730000001003", "exp_date":"122025", "cvv":"100","trx_amount":230, "trx_currency":"SGD", "trx_type":"S", "card_brand":"Mastercard"},
      20: {"case_number":"20", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"2223000890000018", "exp_date":"122025", "cvv":"100","trx_amount":240, "trx_currency":"SGD", "trx_type":"A", "card_brand":"Mastercard"},
      // 21: {"case_number":"21", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"2223000890000018", "exp_date":"122025", "cvv":"100","trx_amount":240, "trx_currency":"SGD", "trx_type":"Authorisation_Completion", "card_brand":"Mastercard"},
      22: {"case_number":"22", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"2223000890000018", "exp_date":"122025", "cvv":"100","trx_amount":270, "trx_currency":"SGD", "trx_type":"S", "card_brand":"Mastercard"},
      // 23: {"case_number":"23", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"2223000890000018", "exp_date":"122025", "cvv":"100","trx_amount":270, "trx_currency":"SGD", "trx_type":"Void", "card_brand":"Mastercard"},
      24: {"case_number":"24", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"5185540000000019", "exp_date":"122025", "cvv":"001","trx_amount":290, "trx_currency":"SGD", "trx_type":"A", "card_brand":"Mastercard"},
      // 25: {"case_number":"25", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"5185540000000019", "exp_date":"122025", "cvv":"001","trx_amount":290, "trx_currency":"SGD", "trx_type":"Full_Reversal", "card_brand":"Mastercard"},
      26: {"case_number":"26", "api_mode":"redirection_hosted", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"5455330200000016", "exp_date":"122025", "cvv":"001","trx_amount":310, "trx_currency":"SGD", "trx_type":"A", "card_brand":"Mastercard"},
      // 27: {"case_number":"27", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"5455330200000016", "exp_date":"122025", "cvv":"001","trx_amount":300, "trx_currency":"SGD", "trx_type":"Partial_Reveral", "card_brand":"Mastercard"},
      28: {"case_number":"28", "api_mode":"redirection_sop", "sub_trx_type":"Domestic", "mid":"1007780734", "card_number":"5346930200208114", "exp_date":"122025", "cvv":"811","trx_amount":400, "trx_currency":"SGD", "trx_type":"S", "card_brand":"Mastercard"},
      29: {"case_number":"29", "api_mode":"redirection_sop", "sub_trx_type":"Domestic", "mid":"1007780734", "card_number":"5346930200208114", "exp_date":"122025", "cvv":"811","trx_amount":400, "trx_currency":"SGD", "trx_type":"S", "card_brand":"Mastercard"},
      30: {"case_number":"30", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780770", "card_number":"2223000890000018", "exp_date":"122025", "cvv":"100","trx_amount":150, "trx_currency":"USD", "trx_type":"S", "card_brand":"Mastercard"},
      31: {"case_number":"31", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780823", "card_number":"5455330200000016", "exp_date":"122025", "cvv":"001","trx_amount":170, "trx_currency":"EUR", "trx_type":"S", "card_brand":"Mastercard"},
      32: {"case_number":"32", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780824", "card_number":"5185540000000019", "exp_date":"122025", "cvv":"001","trx_amount":30000, "trx_currency":"JPY", "trx_type":"S", "card_brand":"Mastercard"},
      33: {"case_number":"33", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871", "trx_currency":"SGD", "mcp_amount":310, "mcp_currency":"EUR", "trx_type":"S", "card_brand":"VISA"},
      34: {"case_number":"34", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"4123709999000029", "exp_date":"122031", "cvv":"855", "trx_currency":"SGD", "mcp_amount":320, "mcp_currency":"HKD", "trx_type":"S", "card_brand":"VISA"},
      35: {"case_number":"35", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871", "trx_currency":"SGD", "mcp_amount":340, "mcp_currency":"KWD", "trx_type":"A", "card_brand":"VISA"},
      // 36: {"case_number":"36", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871", "trx_currency":"SGD", "mcp_amount":340, "mcp_currency":"KWD", "trx_type":"Authorisation_Completion", "card_brand":"VISA"},
      37: {"case_number":"37", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871", "trx_currency":"SGD", "mcp_amount":370, "mcp_currency":"EUR", "trx_type":"S", "card_brand":"VISA"},
      // 38: {"case_number":"38", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871", "trx_currency":"SGD", "mcp_amount":370, "mcp_currency":"EUR", "trx_type":"Void", "card_brand":"VISA"},
      39: {"case_number":"39", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"4025249999000090", "exp_date":"122031", "cvv":"621", "trx_currency":"SGD", "mcp_amount":390, "mcp_currency":"HKD", "trx_type":"A", "card_brand":"VISA"},
      // 40: {"case_number":"40", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"4025249999000090", "exp_date":"122031", "cvv":"621", "trx_currency":"SGD", "mcp_amount":390, "mcp_currency":"HKD", "trx_type":"Full_Reversal", "card_brand":"VISA"},
      41: {"case_number":"41", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"4515459999000084", "exp_date":"122031", "cvv":"217", "trx_currency":"SGD", "mcp_amount":31000, "mcp_currency":"JPY", "trx_type":"A", "card_brand":"VISA"},
      // 42: {"case_number":"42", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"4515459999000084", "exp_date":"122031", "cvv":"217", "trx_currency":"SGD", "mcp_amount":30000, "mcp_currency":"JPY", "trx_type":"Partial_Reveral", "card_brand":"VISA"},
      43: {"case_number":"43", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780770", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871", "trx_currency":"USD", "mcp_amount":550, "mcp_currency":"EUR", "trx_type":"S", "card_brand":"VISA"},
      44: {"case_number":"44", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780823", "card_number":"4515459999000084", "exp_date":"122031", "cvv":"217", "trx_currency":"EUR", "mcp_amount":560, "mcp_currency":"KWD", "trx_type":"S", "card_brand":"VISA"},
      45: {"case_number":"45", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780824", "card_number":"4025249999000090", "exp_date":"122031", "cvv":"621", "trx_currency":"JPY", "mcp_amount":570, "mcp_currency":"SGD", "trx_type":"S", "card_brand":"VISA"},
      46: {"case_number":"46", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"2223000890000018", "exp_date":"122025", "cvv":"100", "trx_currency":"SGD", "mcp_amount":410, "mcp_currency":"EUR", "trx_type":"S", "card_brand":"Mastercard"},
      47: {"case_number":"47", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"5204740000001002", "exp_date":"122025", "cvv":"100", "trx_currency":"SGD", "mcp_amount":420, "mcp_currency":"HKD", "trx_type":"S", "card_brand":"Mastercard"},
      48: {"case_number":"48", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"2223000890000018", "exp_date":"122025", "cvv":"100", "trx_currency":"SGD", "mcp_amount":440, "mcp_currency":"KWD", "trx_type":"A", "card_brand":"Mastercard"},
      // 49: {"case_number":"49", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"2223000890000018", "exp_date":"122025", "cvv":"100", "trx_currency":"SGD", "mcp_amount":440, "mcp_currency":"KWD", "trx_type":"Authorisation_Completion", "card_brand":"Mastercard"},
      50: {"case_number":"50", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"2223000890000018", "exp_date":"122025", "cvv":"100", "trx_currency":"SGD", "mcp_amount":470, "mcp_currency":"EUR", "trx_type":"S", "card_brand":"Mastercard"},
      // 51: {"case_number":"51", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"2223000890000018", "exp_date":"122025", "cvv":"100", "trx_currency":"SGD", "mcp_amount":470, "mcp_currency":"EUR", "trx_type":"Void", "card_brand":"Mastercard"},
      52: {"case_number":"52", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"5185540000000019", "exp_date":"122025", "cvv":"001", "trx_currency":"SGD", "mcp_amount":490, "mcp_currency":"HKD", "trx_type":"A", "card_brand":"Mastercard"},
      // 53: {"case_number":"53", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"5185540000000019", "exp_date":"122025", "cvv":"001", "trx_currency":"SGD", "mcp_amount":490, "mcp_currency":"HKD", "trx_type":"Full_Reversal", "card_brand":"Mastercard"},
      54: {"case_number":"54", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"5455330200000016", "exp_date":"122025", "cvv":"001", "trx_currency":"SGD", "mcp_amount":41000, "mcp_currency":"JPY", "trx_type":"A", "card_brand":"Mastercard"},
      // 55: {"case_number":"55", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780734", "card_number":"5455330200000016", "exp_date":"122025", "cvv":"001", "trx_currency":"SGD", "mcp_amount":40000, "mcp_currency":"JPY", "trx_type":"Partial_Reveral", "card_brand":"Mastercard"},
      56: {"case_number":"56", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780770", "card_number":"2223000890000018", "exp_date":"122025", "cvv":"100", "trx_currency":"USD", "mcp_amount":650, "mcp_currency":"EUR", "trx_type":"S", "card_brand":"Mastercard"},
      57: {"case_number":"57", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780823", "card_number":"5455330200000016", "exp_date":"122025", "cvv":"001", "trx_currency":"EUR", "mcp_amount":660, "mcp_currency":"KWD", "trx_type":"S", "card_brand":"Mastercard"},
      58: {"case_number":"58", "api_mode":"redirection_hosted", "sub_trx_type":"MCP", "mid":"1007780824", "card_number":"5185540000000019", "exp_date":"122025", "cvv":"001", "trx_currency":"JPY", "mcp_amount":670, "mcp_currency":"SGD", "trx_type":"S", "card_brand":"Mastercard"},
      67: {"case_number":"67", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780734", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871", "trx_amount":1000.00, "trx_currency":"SGD", "trx_type":"S", "card_brand":"Mastercard"},
      68: {"case_number":"68", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780770", "card_number":"4229989999000012", "exp_date":"122031", "cvv":"871", "trx_amount":2000.00, "trx_currency":"USD", "trx_type":"S", "card_brand":"Mastercard"},
      69: {"case_number":"69", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780823", "card_number":"4515459999000084", "exp_date":"122031", "cvv":"217", "trx_amount":3000.00, "trx_currency":"EUR", "trx_type":"S", "card_brand":"Mastercard"},
      70: {"case_number":"70", "api_mode":"redirection_sop", "sub_trx_type":"Local", "mid":"1007780824", "card_number":"4025249999000090", "exp_date":"122031", "cvv":"621", "trx_amount":100000.00, "trx_currency":"JPY", "trx_type":"S", "card_brand":"Mastercard"},
    }

    if(is.existy(index)) {
      // if(is.array(index)) {
      //   presignature = _.map(test_cases, function(val, key) {
      //     return val;
      //   }).join("")
      // }
      return [test_cases[index]]
    } else {
      return test_cases
    }
  },

  getRandomTestCase: function() {
    const test_cases = [
      // {"card_number":"5243120030504148", "cvv2":"674", "exp_date":"122024"},
      // {"card_number":"5400670032784212", "cvv2":"578", "exp_date":"072024"},
      // {"card_number":"5243120028079590", "cvv2":"759", "exp_date":"092025"},
      // {"card_number":"4966230330042653", "cvv2":"297", "exp_date":"082028"},
      // {"card_number":"4842810730001647", "cvv2":"897", "exp_date":"102023"},
      // {"card_number":"4966230338769299", "cvv2":"438", "exp_date":"032024"},
      {"card_number":"4023100079998012", "cvv2":"123", "exp_date":"102028"},
      // {"card_number":"4024007127642220", "cvv2":"123", "exp_date":"082029"},
      {"card_number":"5521970079998012", "cvv2":"123", "exp_date":"102028"},
      // {"card_number":"5449226593143273", "cvv2":"123", "exp_date":"082029"},
      // {"card_number":"4229989999000012", "exp_date":"122031","cvv2":"871"},
      // {"card_number":"4123709999000029", "exp_date":"122031","cvv2":"855"},
      // {"card_number":"4761369999000078", "exp_date":"122031","cvv2":"964"},
      // {"card_number":"4515459999000084", "exp_date":"122031","cvv2":"217"},
      // {"card_number":"4025249999000090", "exp_date":"122031","cvv2":"621"},
      // {"card_number":"4761349999000039", "exp_date":"122031","cvv2":"998"},
      // {"card_number":"2223000890000018", "exp_date":"122025","cvv2":"100"},
      // {"card_number":"5204740000001002", "exp_date":"122025","cvv2":"100"},
      // {"card_number":"5204730000001003", "exp_date":"122025","cvv2":"100"},
      // {"card_number":"5455330200000016", "exp_date":"122025","cvv2":"001"},
      // {"card_number":"5185540000000019", "exp_date":"122025","cvv2":"001"},
      // {"card_number":"5346930200208114", "exp_date":"122025","cvv2":"811"},
      // {"card_number":"4515450000000080", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"4025240000000096", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"4176660000000100", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"4005520000000129", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"4761260000000130", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"4761340000000076", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"5184680140001013", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"5204230010000012", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"5204500670001017", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"5204830010003443", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"5102820000008406", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"5204730000006663", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"4174070000000112", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"4174070000000104", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"4025240000000088", "exp_date":"122031","cvv2":"123"},
      // {"card_number":"4761260000000134", "exp_date":"122031","cvv2":"123"}

    ]
    return test_cases
  }
}
