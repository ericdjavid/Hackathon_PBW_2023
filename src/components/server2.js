const xrpl = require('xrpl')

const tn = 'wss://s.altnet.rippletest.net:51233'
const api = new xrpl.Client(tn)

const address = 'rNYSW6g8RnG1fEodnKjwP79hU5S6S2m9u'

// Connect to the XRP Ledger node
api.connect().then(() => {
  console.log('Connected to XRPL')

  // Retrieve information about the account
  return api.request('Payment', { account: address })
}).then((response) => {
  // Check the AccountTxn field of the response for transactions involving the account
  const accountTxn = response.account_data.AccountTxn
  if (accountTxn) {
    api.on('transaction', (tx) => {
      console.log('Received transaction from', tx.Account)
      if (tx.TransactionType === 'Payment' && tx.Account === address) {
        console.log('Received Payment transaction involving', address)
        console.log(tx)
      }
    })
  } else {
    console.log('No transactions involving', address)
  }
}).catch((error) => {
  console.error(error)
})
