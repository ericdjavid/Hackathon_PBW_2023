import React, { useCallback, useEffect, useState } from 'react';
import { isConnected, getNFT, getPublicKey } from '@gemwallet/api';
import Cookies from 'js-cookie';

export default function LoginNftButton() {
  const [nfts, setNfts] = useState<unknown[]>();
  const [address, setAddress] = useState('');
  const [showAddress, setShowAddress] = useState(false);
  const [isGemWalletInstalled, setIsGemWalletInstalled] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Récupérer l'adresse du wallet de l'utilisateur depuis le cookie
    const walletAddress:any= Cookies.get('walletAddress') || null;
    if (walletAddress != null)
    {
      setAddress(walletAddress)
      setShowAddress(true);
    }
  }, [])

  const handleNFT = useCallback(async () => {
    const isConnectedGem = await isConnected();
    if (isConnectedGem) {
      const responsePublicKey = await getPublicKey();
      if (responsePublicKey) {
        const { address: addr, publicKey } = responsePublicKey;
        setAddress(addr);
        // Stocker l'adresse du wallet de l'utilisateur dans un cookie
        Cookies.set('walletAddress', addr);
        setShowAddress(true);
      }
      const nft = await getNFT();
      setNfts(nft || []);
      if (nfts?.length == 0) {
        alert('No NFTs found in your wallet');
      } else {
        alert('NFTs found in your wallet');
      }
    } else {
      setIsGemWalletInstalled(false);
    }
  }, []);

  return (
    <div>
      <button
        onClick={showAddress ? (() => setOpen(!open)) : handleNFT}
        className="connect_wallet text-white font-bold py-2 px-4 rounded-full absolute top-5 right-5 z-20">
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 17.5c-3.584 0-6.5-2.916-6.5-6.5s2.916-6.5 6.5-6.5 6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5z"/>
    <path d="M9.5 5.5c0 .276-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v2zm0 7c0 .276-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v2zm6.5-7c0 .276-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v2zm0 7c0 .276-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v2z"/>
  </svg> */}

        {showAddress ? <div>{address?.slice(0, 6) + "..."}</div> : <div>Connect Wallet</div>}
      </button>
      {
        open && (
          <div className="absolute top-20 right-0 mt-4 mr-4 flex flex-col gap-y-2 items-center rounded-md p-5 border border-gray-400">
            <div>
              <span className="text-gray-400 text-sm mr-2">Balance:</span>
              <span className="text-white font-medium text-sm mr-4">$12,345.67</span>
            </div>
            <button className="connect_wallet text-white font-medium py-1 px-2 rounded-full mr-4">
              Déconnexion
            </button>
            {/* <img src="/avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full border border-gray-400"> */}
          </div>
        )
      }

      {/* {nfts !== undefined ? (
        <pre>
          <code>{JSON.stringify(nfts, null, 4)}</code>
        </pre>
      ) : null} */}
    </div>
  );
}
