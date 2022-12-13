let moment = require('moment');
let is     = require('is_js');
let _      = require('underscore')
// var MongoClient = require('mongodb').MongoClient;

// yaddi:m5Vq4OtQKZ4n60G7
// var dbUri = "mongodb+srv://yaddi:m5Vq4OtQKZ4n60G7@cluster0-bqnlp.mongodb.net/test?retryWrites=true";

module.exports = {

  randomOrderId: function (param) {
    if (is.not.existy(param.recurring_mod)) {
      return 'RDP' + this.randomString2(3)
    }
    else {
      return 'RECURR' + this.randomString2(3)
    }
  },

  randomString: function (type) {
    switch (type) {
      case 'timestamp':
        return moment().valueOf().toString();
        break;
      default:
        return 'RDP' + this.randomString2(4)
        break;
    }
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

  randomNumber: function(currency, floatingDigit = true) {

    min = 1;
    max = '0';
    decimalDigit = 2;
    x = max.length
    if (currency == 'IDR') {
      min = 5000
      decimalDigit = 5
      floatingDigit = false
    }

    if (currency == 'JPY') {
      floatingDigit = false
    }

    while (decimalDigit >= x) {
      max = max + 9;
      x++
    }
    
    max = parseInt(max)

    decimal = this.getRandomInt(min, max)
    floating = 0;
    if(floatingDigit) {
      floating = this.getRandomInt(min, 99)/100
    }
    
    return decimal+floating
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
  }
};