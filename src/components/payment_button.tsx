import React, { useCallback, useState } from "react";
import {isConnected, sendPayment} from "@gemwallet/api";

export default function PaymentButton() {
  const [payment_done, setPaymentDone] = useState(false);
  const [payment_error, setPaymentError] = useState(false);
  const [payment_error_message, setPaymentErrorMessage] = useState("");
  const [payment_amount, setPaymentAmount] = useState(10);
  const payment_address = "rLraP2GLKLsHq1TGpTzoaq3wp5zAvTZqBQ";
  
  const handlePayment = useCallback(async () => {
    try {
      const isGemWalletInstalled = await isConnected();
      if (isGemWalletInstalled) {
        const payment = {
          amount: payment_amount,
          destination: payment_address,
        };
        const trHash = await sendPayment(payment);
        console.log("Transaction Hash: ", trHash);
        setPaymentDone(true);
        alert ("Payment done");
      } else {
        // Handle case where wallet is not connected
        alert("Wallet is not connected");
      }
    } catch (error) {
      console.log("Error: ", error);
      setPaymentError(true);
      setPaymentErrorMessage(error.message);
    }
  }, [payment_amount]);

  return (
    <section>
      <div>Send 10 XRP to {payment_address}</div>
      <button type="button" onClick={handlePayment}>
        Pay
      </button>
    </section>
  );
};
