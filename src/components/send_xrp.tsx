import React, { useCallback, useState } from "react";
const xrpl = require('xrpl')
const mn =  "wss://xrpicluster.com"
const tn = "wss://s.altnet.rippletest.net:51233"
const pk = "sEdVK3uX7CgxUzuG8oSod62BuKW4Eyf"

export default function SendXRPButton() {

    async function sendXRP() {
        debugger;
        let results  = "Connecting to the selected ledger.\n"
        let net = tn
        results = 'Connecting to ' + net + '....'
        const client = new xrpl.Client(net)
        await client.connect()
    
        results  += "\nConnected. Sending XRP.\n"
    
        const standby_wallet = xrpl.Wallet.fromSeed(pk)
        const sendAmount = 10
        
        results += "\nstandby_wallet.address: = " + standby_wallet.address
    
        // ------------------------------------------------------- Prepare transaction
        // Note that the destination is hard coded.
        const prepared = await client.autofill({
        "TransactionType": "Payment",
        "Account": standby_wallet.address,
        "Amount": xrpl.xrpToDrops(sendAmount),
        "Destination": "rLraP2GLKLsHq1TGpTzoaq3wp5zAvTZqBQ"
        })
    
        // ------------------------------------------------ Sign prepared instructions
        const signed = standby_wallet.sign(prepared)
    
        // -------------------------------------------------------- Submit signed blob
        const tx = await client.submitAndWait(signed.tx_blob)
    
        results  += "\nBalance changes: " + 
            JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
        alert("Transaction hash: " + tx.result)
        let balance = await client.getXrpBalance(standby_wallet.address)
        results += "\nBalance: " + balance
        console.log(results)      
        client.disconnect()
    
    } // End of sendXRP()

    return (
        <div>
            <button onClick={sendXRP}>Send XRP</button>
        </div>
    )
}