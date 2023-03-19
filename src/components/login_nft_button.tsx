import React, { useCallback, useEffect, useState } from 'react';
import { isConnected, getNFT, getPublicKey } from '@gemwallet/api';
import Cookies from 'js-cookie';
import { convertStringToHex, convertHexToString } from 'xrpl'
import Image from 'next/image';

export default function LoginNftButton() {
  const [myNft, setMyNft]: any = useState(null);
  const [address, setAddress] = useState('');
  const [showAddress, setShowAddress] = useState(false);
  const [isGemWalletInstalled, setIsGemWalletInstalled] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  const [nfts, setNfts] = useState<unknown[]>();

  useEffect(() => {
    // Récupérer l'adresse du wallet de l'utilisateur depuis le cookie
    const walletAddress: any = Cookies.get('walletAddress') || null;
    const myNft = Cookies.get('nfts');
    setMyNft(myNft);

    if (walletAddress != null) {
      setAddress(walletAddress)
      setShowAddress(true);
    }
    console.log(myNft)
    console.log(walletAddress)
  }, [])

  async function handleNFT ()
  {
    const isConnectedGem = await isConnected();
    if (isConnectedGem) {
      const responsePublicKey = await getPublicKey();
      if (responsePublicKey) {
        const { address: addr, publicKey } = responsePublicKey;
        setAddress(addr);
        Cookies.set('walletAddress', addr);
        setShowAddress(true);
      }
      getNFT().then((trHash) => {
        console.log("Your NFTs: ", trHash);
      });
      const nft:any = await getNFT();
      console.log(nft);
      setNfts(nft || []);
      if (nfts?.length == 0) {  
        alert("No NFTs found in your wallet");
      }
      else {
        alert("NFTs found in your wallet");
        Cookies.set('nfts', convertHexToString("https://cloudflare-ipfs.com/ipfs/" + nft[0].URI));
        setMyNft("https://cloudflare-ipfs.com/ipfs/" + nft[0].URI)
        // setNfts(nft);
        console.log(myNft)
        }

    } else {
      setIsGemWalletInstalled(false);
    }
  }

  // async function handleNFT() {
  //   const isConnectedGem = await isConnected();
  //   if (isConnectedGem) {
  //     const responsePublicKey = await getPublicKey();
  //     if (responsePublicKey) {
  //       const { address: addr, publicKey } = responsePublicKey;
  //       setAddress(addr);
  //       // Stocker l'adresse du wallet de l'utilisateur dans un cookie
  //       setShowAddress(true);
  //     }
  //       const nft: any = await getNFT();
        
  //   } else {
  //     setIsGemWalletInstalled(false);
  //   }
  // }

  return (
    <div>
      <button
        onClick={showAddress ? (() => setOpen(!open)) : handleNFT}
        className="connect_wallet text-white font-bold py-2 px-4 rounded-full absolute top-5 right-5 z-20">

        {showAddress ? <div>{address?.slice(0, 10) + "..."}</div> : <div>Connect Wallet</div>}
      </button>
      {
        open && (
          <div className="absolute top-20 right-0 mt-4 mr-4 flex flex-col gap-y-2 items-center rounded-md p-5 border border-gray-400">
            <div>
              <span className="text-gray-400 text-sm mr-2">Balance:</span>
              <span className="text-white font-medium text-sm mr-4">$12,345.67</span>
            </div>
            <span className="text-gray-400 text-sm mr-2">NFT</span>
            <button className="connect_wallet text-white font-medium py-1 px-2 rounded-full mr-4">
              Déconnexion
            </button>
            {myNft != null && (<>
              <Image src={myNft} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-400" />
            </>)}
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
