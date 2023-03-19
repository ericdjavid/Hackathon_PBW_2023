const xrpl = require('xrpl')
const express = require('express')
const app = express()
const port = 3002

const mn = "wss://xrpicluster.com"
const tn = "wss://s.altnet.rippletest.net:51233"
const pk = "sEdVK3uX7CgxUzuG8oSod62BuKW4Eyf"

const Payment = 'Payment'
const api = new xrpl.Client(tn)
api.on(Payment, (tx) => {
    console.log('Received transaction')
    console.log(tx)
    api.connect().then(() => {
        console.log('Connected to XRPL')
        
      }) 
  })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})