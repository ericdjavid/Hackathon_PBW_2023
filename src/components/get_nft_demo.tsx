import React, { useCallback, useState } from "react";
import { isConnected, getNFT, getPublicKey } from "@gemwallet/api";

export default function GetNFTDemo() {
  const [nfts, setNfts] = useState<unknown[]>();
  const [address, setAddress] = useState('');
  const [showAddress, setShowAddress] = useState(false);
  const [isGemWalletInstalled, setIsGemWalletInstalled] =
    useState<boolean>(true);

  const handleNFT = useCallback(async () =>{
    const isConnectedGem = await isConnected();
    if (isConnectedGem) {
      const responsePublicKey = await getPublicKey();
      if (responsePublicKey) {
        const { address: addr, publicKey } = responsePublicKey;
        setAddress(addr);
        setShowAddress(true);
      }
      const nft = await getNFT();
      setNfts(nft || []);
    } else {
      setIsGemWalletInstalled(false);
    }
  }, []);

  return (
    <div className="">
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full absolute top-5 right-5">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 17.5c-3.584 0-6.5-2.916-6.5-6.5s2.916-6.5 6.5-6.5 6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5z"/>
    <path d="M9.5 5.5c0 .276-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v2zm0 7c0 .276-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v2zm6.5-7c0 .276-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v2zm0 7c0 .276-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v2z"/>
  </svg>
  Se connecter
</button>
      {!isGemWalletInstalled ? <div>Please install GemWallet</div> : null}
      {showAddress ? <p id="address">{address}</p> : null}
      <div>Show the NFTs held in your wallet?</div>
      <button type="button" onClick={handleNFT}>
        Login & Get my NFTs
      </button>
      {nfts !== undefined ? (
        <pre>
          <code>{JSON.stringify(nfts, null, 4)}</code>
        </pre>
      ) : null}
    </div>
  )
      };
