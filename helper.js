let moment = require('moment-timezone');
let is     = require('is_js');
let _      = require('underscore')
const fs = require("fs");
// var MongoClient = require('mongodb').MongoClient;

// yaddi:m5Vq4OtQKZ4n60G7
// var dbUri = "mongodb+srv://yaddi:m5Vq4OtQKZ4n60G7@cluster0-bqnlp.mongodb.net/test?retryWrites=true";

module.exports = {

  logger: function (log_dir, filename, data){

    data = moment().format() +" -> "+ data + "\n"
    if (!fs.existsSync(log_dir)){
      fs.mkdirSync(log_dir);
    }

    try {
      if (fs.existsSync(filename)) {
        fs.appendFile(filename, data, function (err) {
          if (err) return console.log(err);
          // console.log(err);
        });
      } else {
        fs.writeFile(filename, data, function (err) {
          if (err) {
            // console.log(err);
            return err
          }
          else {
            // console.log("write data to log file");
          }
        });
      }
    } catch (err) {
      console.error("Error", err);
    }
  },

  randomOrderId: function (param) {
    if (is.not.existy(param.recurring_mod)) {
      return param.ccy+'_'+this.randomString()
      // return 'GST' + this.randomString('timestamp')
    }
    else {
      return 'RECURR_' + this.randomString2(4)
    }
  },

  randomString: function (type) {
    switch (type) {
      case 'timestamp':
        // return moment().valueOf().toString();
        currentTime = moment().tz('Asia/Singapore')
        return currentTime.format('MMDD_HHmmss')
        break;
      default:
        return this.randomString2(4)
        break;
    }
  },

  saleOrAuth: function() {
    const characters ='AS';

    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < 1; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  },

  randomString2: function(length) {
    var smallcase = 'qwertyuiopasdfghjklzxcvbnm';
    var UPPERcase = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    var number = '1234567890';
    var strings = smallcase + number;

    var randomString = '';
    for (let index = 0; index < length; index++) {
      min = Math.ceil(index)
      max = Math.floor(strings.length)
      randomString += strings[Math.floor(Math.random() * (max - min) + min)]
    }
    return randomString
  },

  randomNumber: function(currency, floatingDigit = 2) {

    min = 1;
    max = 30

    x = max.length
    if (currency == 'IDR') {
      min = 5000
      max = 1000000
      floatingDigit = 0
    }

    if (currency == 'JPY') {
      min = 55
      max = 10000
      floatingDigit = 0
    }

    console.log("min, max", min, max)
    const randomAmount = (Math.random() * (max - min) + min).toFixed(floatingDigit);
    console.log(randomAmount);

    return randomAmount
  },

  getRandomInt: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  },

  ksort: function sortObject(object){
    var sortedObj = {},
        keys = _.keys(object);

    keys = _.sortBy(keys, function(key){
        return key;
    });

    _.each(keys, function(key) {
        if(is.object(object[key])){
          sortedObj[key] = sortObject(object[key]);
        } else {
          sortedObj[key] = object[key];
        }
    });
    return sortedObj;
  },

  dbSave: function (data) {
    var insertedId = null;
    (async function() {
      let client;
      try {
        client = await MongoClient.connect(dbUri);
        console.log("Connected correctly to server");
        const db = client.db("rdpApi");

        // Insert a single document
        let r = await db.collection('apiRequest').insertOne(
          {data: data, requestTimestamp: new Date()},
          function(err, data) {
            insertedId = data.insertedId
          }
        );
      } catch (err) {
        console.log(err.stack);
      }
      client.close();
    })();
  },

  currency_minor_unit: function(currency){
    ccy = {
      "JPY":0,
      "CHF":2,
      "EUR":2,
      "HKD":2,
      "KWD":3,
      "SGD":2,
      "USD":2
    }

    return ccy[currency]
  }
  
};