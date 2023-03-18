import React, { useCallback, useState } from 'react'
import { getAddress, isConnected, getNFT, getPublicKey } from "@gemwallet/api";

export default function LoginButton() {
  const [address, setAddress] = useState('');

  const connect = useCallback(async () => {
    const isConnected_ = await isConnected();
    if (isConnected_) {
      const responsePublicKey = await getPublicKey();
      if (responsePublicKey) {
        const { address: addr, publicKey } = responsePublicKey;
        setAddress(addr);
      }
    } else {
      alert(
        "User doesn't have GemWallet! Please install it: https://gemwallet.app"
      );
    }
  }, []);

  return (
    <>
      <button onClick={connect}>Login with GemWallet</button>
      <p id="address">{address}</p>
    </>
  );
}
