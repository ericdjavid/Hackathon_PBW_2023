from xrpl.clients import JsonRpcClient
from xrpl import wallet
from xrpl.models.transactions import Payment
from xrpl.transaction import safe_sign_transaction, send_reliable_submission
from xrpl.ledger import get_latest_validated_ledger_sequence
from xrpl.account import get_next_valid_seq_number


mainnet_client = JsonRpcClient("wss://xrpicluster.com")
testnet_client = JsonRpcClient("wss://s.altnet.rippletest.net:51233")
client = testnet_client
seed = "sEdVK3uX7CgxUzuG8oSod62BuKW4Eyf"


def send_xrp(wallet_from_seed, client, amount, destination):
    # prepare the transaction
    # the amount is expressed in drops, not XRP
    # see https://xrpl.org/basic-data-types.html#specifying-currency-amounts
    my_tx_payment = Payment(
        account=wallet_from_seed.classic_address,
        amount=amount,
        destination=destination,
        last_ledger_sequence=get_latest_validated_ledger_sequence(client) + 10,
        sequence=get_next_valid_seq_number(wallet_from_seed.classic_address, client)
    )
    # sign the transaction
    my_tx_payment_signed = safe_sign_transaction(my_tx_payment,wallet_from_seed)

    # submit the transaction
    tx_response = send_reliable_submission(my_tx_payment_signed, client)


if __name__ == "__main__":
    # Use wallet from seed
    wallet_from_seed = wallet.Wallet(seed,0)
    destination = "r9LqNeG6qHxjeUocjvVki2XR35weJ9mZgQ"
    client_connection = JsonRpcClient(client)
    send_xrp(wallet_from_seed, client, "10", destination)