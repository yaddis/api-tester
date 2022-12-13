data = '{"request":{"mid":"1007780247","response_type":"json","action_type":"refund","order_number":"RDP8bzsjg","transaction_id":"RDP8bzsjg_17251023841184775733","currency":"JPY","amount":"200","signature":"f1f52fdae11fb8f92e50c91265fcb9b0"},"response":{"order_number":"RDP8bzsjg","mid":"1007780247","reason_code":1,"q_reason_code":1,"result_status":"accepted","currency":"JPY","amount":"200","timestamp":"2022-03-21 10:06:40","signature":"4c04bcd4f20ea1b172945cce2e0c6907"}}'

output = JSON.stringify(data, "\n", "\t");

console.log(output)