// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");
const moment = require('moment')

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
    apiKey: "AIzaSyByRIZ2corSJxVWdZZGXyGvxHdICNMcHtE",
    authDomain: "hybrid-6981f.firebaseapp.com",
    databaseURL: "https://hybrid-6981f.firebaseio.com",
    projectId: "hybrid-6981f",
    storageBucket: "hybrid-6981f.appspot.com",
    messagingSenderId: "244288211645",
    appId: "1:244288211645:web:a15896a1ba875ac90a85d4",
    measurementId: "G-V875Y5V6BP"
};

// var dbUri = "mongodb+srv://yaddi-apilogger:W2u1rF64huvOCzun@clusterapilogger0.n7zk9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var gcm_database = firebase.database();

  var current_day = moment().format('YYYY-MM-DD');
  var current_timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

  // const { MongoClient } = require('mongodb');
  // const { resolveContent } = require("nodemailer/lib/shared");
  // const { collect, result, reject } = require("underscore");

  // // Replace the following with values for your environment.
  // const username = encodeURIComponent("yaddi-apilogger");
  // const password = encodeURIComponent("W2u1rF64huvOCzun");
  // const clusterUrl = "clusterapilogger0.n7zk9.mongodb.net";
  // const authMechanism = "DEFAULT";

  // const uri =
  //   `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;
  // // Create a new MongoClient
  // const client = new MongoClient(uri, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   connectTimeoutMS: 100,
  //   keepAlive: 1
  // });

  module.exports = {

    // action: open/close
    db_connect:function(action){
    

    },

    
    payment_request: function (data) {
        if(client)
          client.close()

        async function run() {
          try {
            // Connect the client to the server
            await client.connect();
            // Establish and verify connection
            await client.db("admin").command({ ping: 1 });
            console.log("Connected successfully to server");
            
            const database = client.db("ReddotApiRequest");
            const payment = database.collection("payment");

            const notification = { "notification": data };
            const log_result = await payment.insertOne(notification)
            datax = log_result.insertedId
            console.log(log_result.insertedId)

            return datax
          } finally {
            // Ensures that the client will close when you finish/error
            if(client)
              await client.close();
            console.log('connection closed')
          }
        }
        run()
          .then((data) => {
            return data
          })
          .catch(console.dir);
        // run().then((datax) => {
        //   console.log(datax)
        // })

        // const db_action = new Promise(() => {
        //   client.connect();
        //   // Establish and verify connection
        //   client.db("admin").command({ ping: 1 });
        //   console.log("Connected successfully to server");
          
        //   database = client.db("ReddotApiRequest");
        //   payment = database.collection("payment");

        //   notification = { "notification": data };
        //   log_result = payment.insertOne(notification)
        //   datax = log_result.insertedId
        //   console.log(log_result.insertedId)
        // })
        // .then((datax)=> {
        //   console.log(datax)
        //   resolve({datax})
        // })
        // .catch((err) => {
        //   console.log(err)
        //   reject(err)
        // })
        
        // return db_action.then(
        //   (data) => {
        //     return data;
        //   }, 
        //   (reject) => {
        //     return reject
        //   }
        // )

        // db_action.then(
        //   (result) => { return result }
        // )
    },

    request_payment: function (data) {
      var db_ref = gcm_database.ref('/payment/'+current_day+'/'+data.order_id+'/request_parameter')
      data_model = {
        "data": data,
        "timestamp": current_timestamp
      }
      db_ref.set(data_model)
    },

    payment_url: function (data) {
      var db_ref = gcm_database.ref('/payment/'+current_day+'/'+data.order_id+'/payment_url')
      data_model = {
        "data": data,
        "timestamp": current_timestamp
      }
      db_ref.set(data_model)

      var orderIdRef = gcm_database.ref('/payment/'+current_day);
      orderIdRef.child(data.order_id).once('value').then(function(snap) {
        var dataSnap = snap.val();
        gcm_database.ref('/payment/'+current_day+'/'+data.transaction_id).set(dataSnap)
        orderIdRef.child(data.order_id).remove()
      });
    },

    payment_response: function (data, response_type) {
      if(response_type == 'redirection') {
        var db_ref = gcm_database.ref('/payment/'+current_day+'/'+data.transaction_id+'/redirection')
        db_ref.child('redirection').get().then((snap) => {
          if (snap.exists()) {
            var dataSnap = snap.val();
              data_model = {
                "data": data,
                "timestamp": current_timestamp
              }
              var dataUpdate = [dataSnap, data_model]
              console.log('dataUpdate', dataUpdate)
              db_ref.set(data_model);

          } else {
            var redirection = db_ref.push();
            redirection.set({
              "data": data,
              "timestamp": current_timestamp
            });
            // db_ref.set([data]);
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });

      } else {
        var db_ref = gcm_database.ref('/payment/'+current_day+'/'+data.transaction_id+'/notification')
        data_model = {
          "data": data,
          "timestamp": current_timestamp
        }
        db_ref.set(data_model)
      }
    },
}