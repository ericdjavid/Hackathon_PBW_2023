const xrpl = require('xrpl')
const mn =  "wss://xrpicluster.com"
const tn = "wss://s.altnet.rippletest.net:51233"
const pk = "sEdVK3uX7CgxUzuG8oSod62BuKW4Eyf"

const Payment = 'Payment'
const api = new xrpl.Client(tn)

api.on('transactions', (tx) => {
    console.log("Received Transaction")
    console.log(tx)
   })