import React, { useCallback, useState } from "react";
const xrpl = require('xrpl')

const mn =  "wss://xrpicluster.com"
const tn = "wss://s.altnet.rippletest.net:51233"
const pk = "sEdVK3uX7CgxUzuG8oSod62BuKW4Eyf"

async function getAccountsFromSeeds() {
    const net = tn
    const client = new xrpl.Client(net)
    let results = 'Connecting to ' + net + '....'
    await client.connect()
    results += '\nConnected, finding wallets.\n'
    const standby_wallet = xrpl.Wallet.fromSeed(pk)
    const standby_balance = (await client.getXrpBalance(standby_wallet.address))
    alert(standby_balance)
}

export default function ShowBalence() {
    return(
        <div>
            <button onClick={getAccountsFromSeeds}>Show Balance</button>
        </div>
    )
}
