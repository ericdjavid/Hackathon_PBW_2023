import React, { useCallback, useState } from "react";
import {isConnected, sendPayment, getNetwork} from "@gemwallet/api";
import Modal from "./modal_box";

export default function PaymentButton(props: any) {
  const [payment_done, setPaymentDone] = useState(false);
  const [payment_error, setPaymentError] = useState(false);
  const [payment_error_message, setPaymentErrorMessage] = useState("");
  const [payment_amount, setPaymentAmount] = useState(10);
  const payment_address = "rLraP2GLKLsHq1TGpTzoaq3wp5zAvTZqBQ";
  const mn = "Mainnet"
  const tn = "Testnet"

  const handlePayment = async () => {
    console.log(props)
    try {
      const isGemWalletInstalled = await isConnected();
      const net = tn;
      if (isGemWalletInstalled) {
        const payment = {
          amount: props?.amount,
          destination: payment_address,
        };
            const trHash = await sendPayment(payment);
            console.log("Transaction Hash: ", trHash);
            if (trHash === null)
            {
                alert("payment failed")
                setPaymentDone(false);
            }
            else
            {
              setPaymentDone(true);
              alert ("Payment done");
              let res = await fetch("/api/postUser", {
                method: "POST",
                body: JSON.stringify({
                  email: props?.email,
                  trHash: trHash,
                }),
              });
              res = await res.json();
              if (res.status === 200) 
                console.log("DB updated !");
            }
      } else {
        // Handle case where wallet is not connected
        alert("Wallet is not connected");
      }
    } catch (error:any) {
      console.log("Error: ", error);
      setPaymentError(true);
      setPaymentErrorMessage(error.message);
    }
  }

  return (
    <>
        <button className="bg-pink-500 hover:bg-pink-700 w-1/2 text-white font-bold py-2 px-4 rounded"
      onClick={handlePayment}>
        Pay with crypto (XRP)
      </button>
        </>
  );
};