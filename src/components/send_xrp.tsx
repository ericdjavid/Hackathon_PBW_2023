import React, { useCallback, useState } from "react";
const xrpl = require('xrpl')
const mn =  "wss://xrpicluster.com"
const tn = "wss://s.altnet.rippletest.net:51233"
const pk = "sEdVK3uX7CgxUzuG8oSod62BuKW4Eyf"

async function sendXRP() {
    let results  = "Connecting to the selected ledger.\n"
    xrpl.standbyResultField.value = results
    let net = tn
    results = 'Connecting to ' + net + '....'
    const client = new xrpl.Client(net)
    await client.connect()
  
    results  += "\nConnected. Sending XRP.\n"
    xrpl.standbyResultField.value = results
  
    const standby_wallet = xrpl.Wallet.fromSeed(xrpl.standbySeedField.value)
    const operational_wallet = xrpl.Wallet.fromSeed(xrpl.operationalSeedField.value)
    const sendAmount = xrpl.standbyAmountField.value
    
    results += "\nstandby_wallet.address: = " + standby_wallet.address
    xrpl.standbyResultField.value = results
  
    // ------------------------------------------------------- Prepare transaction
    // Note that the destination is hard coded.
    const prepared = await client.autofill({
      "TransactionType": "Payment",
      "Account": standby_wallet.address,
      "Amount": xrpl.xrpToDrops(sendAmount),
      "Destination": xrpl.standbyDestinationField.value
    })
  
    // ------------------------------------------------ Sign prepared instructions
    const signed = standby_wallet.sign(prepared)
  
    // -------------------------------------------------------- Submit signed blob
    const tx = await client.submitAndWait(signed.tx_blob)
  
     results  += "\nBalance changes: " + 
        JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
     standbyResultField.value = results

    standbyBalanceField.value = 
      (await client.getXrpBalance(standby_wallet.address))
    operationalBalanceField.value = 
      (await client.getXrpBalance(operational_wallet.address))                 
    client.disconnect()
  
  } // End of sendXRP()